/**
 * One-time, idempotent migration: Storyblok -> Sanity.
 *
 * Reads navigation, the home/portfolio/link pages, and all blog posts from the
 * Storyblok GraphQL API, converts Storyblok rich-text JSON to Sanity Portable
 * Text, uploads referenced images to Sanity's asset store, and writes documents
 * with deterministic _ids (createOrReplace) so it can be re-run safely.
 *
 * Required env (loaded from .env.local):
 *   STORYBLOK_ACCESS_TOKEN
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET   (default "production")
 *   SANITY_API_WRITE_TOKEN       (Editor token; create at sanity.io/manage)
 *
 * Run:  node --env-file=.env.local scripts/migrate-storyblok-to-sanity.mjs
 */
import { createClient } from "@sanity/client";
import crypto from "node:crypto";

const SB_TOKEN = process.env.STORYBLOK_ACCESS_TOKEN;
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN;

if (!SB_TOKEN || !PROJECT_ID || !WRITE_TOKEN) {
  console.error(
    "Missing env. Need STORYBLOK_ACCESS_TOKEN, NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_WRITE_TOKEN."
  );
  process.exit(1);
}

const sanity = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: WRITE_TOKEN,
  useCdn: false,
});

const key = () => crypto.randomBytes(6).toString("hex");
const idSafe = (s) => String(s).replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 90);

// ---- Storyblok fetch -------------------------------------------------------

async function sb(query) {
  const res = await fetch("https://gapi.storyblok.com/v1/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Token: SB_TOKEN,
      Version: "published",
    },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error(JSON.stringify(json.errors, null, 2));
    throw new Error("Storyblok query failed");
  }
  return json.data;
}

const getPageContent = (id) =>
  sb(`{ PageItem(id: "${id}") { content { seo body title } } }`).then(
    (d) => d?.PageItem?.content
  );

const getNavigation = () =>
  sb(`{ NavigationItem(id: "navigation") { content { menu } } }`).then(
    (d) => d?.NavigationItem?.content
  );

const getAllPosts = () =>
  sb(`{
    PostItems(sort_by: "first_published_at:desc", per_page: 100) {
      items {
        name slug full_slug first_published_at tag_list
        content {
          component content excerpt isFeatured
          featured_image { filename alt }
          categories { name }
        }
      }
    }
  }`).then((d) => d?.PostItems?.items || []);

// ---- Image upload (cached by URL) -----------------------------------------

const assetCache = new Map();

async function uploadImage(sbImage) {
  const url = sbImage?.filename;
  if (!url) return undefined;
  if (assetCache.has(url)) return assetCache.get(url);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const filename = url.split("/").pop() || "image";
    const asset = await sanity.assets.upload("image", buf, { filename });
    const ref = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      ...(sbImage.alt ? { alt: sbImage.alt } : {}),
    };
    assetCache.set(url, ref);
    console.log(`  uploaded image ${filename}`);
    return ref;
  } catch (e) {
    console.warn(`  ! image upload failed for ${url}: ${e.message}`);
    return undefined;
  }
}

// ---- Storyblok rich text -> Portable Text ----------------------------------

const MARK_MAP = { bold: "strong", italic: "em", code: "code" };

function spansFrom(nodes, markDefs) {
  const spans = [];
  for (const n of nodes || []) {
    if (n.type === "hard_break") {
      spans.push({ _type: "span", _key: key(), text: "\n", marks: [] });
      continue;
    }
    if (n.type !== "text") continue;
    const marks = [];
    for (const m of n.marks || []) {
      if (MARK_MAP[m.type]) marks.push(MARK_MAP[m.type]);
      else if (m.type === "link") {
        const _key = key();
        markDefs.push({
          _key,
          _type: "link",
          href: m.attrs?.href || m.attrs?.url || "",
        });
        marks.push(_key);
      }
    }
    spans.push({ _type: "span", _key: key(), text: n.text || "", marks });
  }
  return spans;
}

function block(style, nodes, extra = {}) {
  const markDefs = [];
  const children = spansFrom(nodes, markDefs);
  return { _type: "block", _key: key(), style, markDefs, children, ...extra };
}

function listBlocks(listNode, listItemValue) {
  const blocks = [];
  for (const li of listNode.content || []) {
    for (const child of li.content || []) {
      if (child.type === "paragraph") {
        blocks.push(
          block("normal", child.content, { listItem: listItemValue, level: 1 })
        );
      }
    }
  }
  return blocks;
}

function toPortableText(doc) {
  if (!doc || !Array.isArray(doc.content)) return [];
  const out = [];
  for (const node of doc.content) {
    switch (node.type) {
      case "paragraph":
        out.push(block("normal", node.content));
        break;
      case "heading":
        out.push(block(`h${node.attrs?.level || 2}`, node.content));
        break;
      case "blockquote":
        for (const c of node.content || [])
          out.push(block("blockquote", c.content));
        break;
      case "bullet_list":
        out.push(...listBlocks(node, "bullet"));
        break;
      case "ordered_list":
        out.push(...listBlocks(node, "number"));
        break;
      case "code_block":
        out.push({
          _type: "code",
          _key: key(),
          language: (node.attrs?.class || "").split("-")[1] || "text",
          code: (node.content || []).map((t) => t.text || "").join(""),
        });
        break;
      default:
        if (node.content) out.push(block("normal", node.content));
    }
  }
  return out;
}

// ---- Body blok mapping -----------------------------------------------------

async function mapBlok(blok) {
  switch (blok.component) {
    case "introduction":
      return {
        _type: "introduction",
        _key: key(),
        image: await uploadImage(blok.image),
        description: toPortableText(blok.description),
      };
    case "portfolios":
      return {
        _type: "portfolios",
        _key: key(),
        items: await Promise.all(
          (blok.items || []).map(async (w) => ({
            _type: "work",
            _key: key(),
            title: w.title,
            image: await uploadImage(w.image),
            description: toPortableText(w.description),
            category: w.category || [],
            url: w.link?.url || w.link?.cached_url || "",
            hide: !!w.hide,
          }))
        ),
      };
    case "histories":
      return {
        _type: "histories",
        _key: key(),
        title: blok.title,
        histories: (blok.histories || []).map((h) => ({
          _type: "history",
          _key: key(),
          title: h.title,
          place: h.place,
          periode: h.periode,
          hide: !!h.hide,
        })),
      };
    case "skills":
      return {
        _type: "skills",
        _key: key(),
        title: blok.title,
        skills: (blok.skills || []).map((s) => ({
          _type: "skill",
          _key: key(),
          name: s.name,
        })),
      };
    case "blogPosts":
      return { _type: "blogPosts", _key: key(), title: blok.title || "" };
    case "links":
      return {
        _type: "links",
        _key: key(),
        links: (blok.links || []).map((l) => ({
          _type: "linkItem",
          _key: key(),
          name: l.name,
          url: l.link?.url || l.link?.cached_url || "",
          socialLink: !!l.socialLink,
          linktype: l.linktype || l.link?.linktype || "url",
        })),
      };
    default:
      console.warn(`  ! unknown blok component "${blok.component}", skipped`);
      return null;
  }
}

async function mapBody(body) {
  const out = [];
  for (const blok of body || []) {
    const mapped = await mapBlok(blok);
    if (mapped) out.push(mapped);
  }
  return out;
}

function mapSeo(seo) {
  if (!seo) return undefined;
  return {
    _type: "seo",
    title: seo.title || "",
    description: seo.description || "",
    og_image: seo.og_image || undefined,
  };
}

// ---- Run -------------------------------------------------------------------

async function migratePage(id) {
  const content = await getPageContent(id);
  if (!content) {
    console.warn(`Page "${id}" not found in Storyblok, skipping.`);
    return null;
  }
  console.log(`Page "${id}"...`);
  return {
    _id: `page-${id}`,
    _type: "page",
    pageId: id,
    title: content.title || "",
    seo: mapSeo(content.seo),
    body: await mapBody(content.body),
  };
}

async function migrateNavigation() {
  const content = await getNavigation();
  if (!content?.menu) return null;
  console.log("Navigation...");
  return {
    _id: "navigation",
    _type: "navigation",
    menu: content.menu.map((m) => ({
      _type: "menuItem",
      _key: key(),
      text: m.text,
      url: m.link?.url || m.link?.cached_url || "",
    })),
  };
}

async function migratePosts() {
  const posts = await getAllPosts();
  console.log(`Posts: ${posts.length}`);
  const docs = [];
  for (const p of posts) {
    console.log(`  post "${p.slug}"...`);
    docs.push({
      _id: `post-${idSafe(p.slug)}`,
      _type: "post",
      title: p.name,
      slug: { _type: "slug", current: p.slug },
      publishedAt: p.first_published_at,
      isFeatured: p.content?.isFeatured === "true" || p.content?.isFeatured === true,
      tags: p.tag_list || [],
      categories: (p.content?.categories || []).map((c) => c.name).filter(Boolean),
      featuredImage: await uploadImage(p.content?.featured_image),
      excerpt: toPortableText(p.content?.excerpt),
      body: toPortableText(p.content?.content),
    });
  }
  return docs;
}

async function main() {
  const docs = [];
  for (const id of ["home", "portfolio", "link"]) {
    const doc = await migratePage(id);
    if (doc) docs.push(doc);
  }
  const nav = await migrateNavigation();
  if (nav) docs.push(nav);
  docs.push(...(await migratePosts()));

  console.log(`\nWriting ${docs.length} documents to Sanity (${DATASET})...`);
  const tx = sanity.transaction();
  for (const doc of docs) tx.createOrReplace(doc);
  await tx.commit();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
