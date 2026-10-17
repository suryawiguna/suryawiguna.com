// Blog posts live in content/posts/<slug>.md: YAML frontmatter, Markdown body.
// The file name is the URL slug. Everything here runs at build time on the
// server; client components may only `import type` from this module.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sharp from "sharp";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const PUBLIC_DIR = path.join(process.cwd(), "public");

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  // ISO timestamps. `date` is first publication and drives sort order;
  // `updated` is the sitemap's lastModified and the JSON-LD dateModified.
  date: string;
  updated: string;
  tags: string[];
  categories: string[];
  cover?: string;
  coverAlt?: string;
  featured: boolean;
  // Rendered, but asked out of the index, the sitemap, tag archives and
  // "Read next".
  noindex: boolean;
  // Only rendered by `next dev`; production builds skip it entirely.
  draft: boolean;
  body: string;
};

// Listings never need the body, and PostGrid ships them to the browser.
export type PostSummary = Omit<Post, "body">;

export type ImageSizes = Record<string, { width: number; height: number }>;

const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

function fail(file: string, message: string): never {
  throw new Error(`content/posts/${file}: ${message}`);
}

// YAML parses an unquoted timestamp into a Date and a quoted one into a string.
function toIso(value: unknown, file: string, field: string) {
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) fail(file, `"${field}" is not a date`);
  return date.toISOString();
}

function list(value: unknown, file: string, field: string): string[] {
  if (value == null) return [];
  if (!Array.isArray(value)) fail(file, `"${field}" must be a list`);
  return value.map((item) => String(item).trim()).filter(Boolean);
}

function parse(file: string): Post {
  const { data, content } = matter(
    fs.readFileSync(path.join(POSTS_DIR, file), "utf8")
  );

  for (const field of ["title", "excerpt", "date"]) {
    if (!data[field]) fail(file, `missing "${field}"`);
  }

  const date = toIso(data.date, file, "date");

  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    excerpt: String(data.excerpt),
    date,
    updated: data.updated ? toIso(data.updated, file, "updated") : date,
    tags: list(data.tags, file, "tags"),
    categories: list(data.categories, file, "categories"),
    cover: data.cover || undefined,
    coverAlt: data.coverAlt || undefined,
    featured: data.featured === true,
    noindex: data.noindex === true,
    draft: data.draft === true,
    body: content.trim(),
  };
}

let cache: Post[] | null = null;

function loadPosts(): Post[] {
  // `next dev` re-reads on every request so edits show up without a restart.
  if (cache && !SHOW_DRAFTS) return cache;

  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(parse)
    .filter((post) => SHOW_DRAFTS || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));

  cache = posts;
  return posts;
}

const summary = ({ body, ...rest }: Post): PostSummary => rest;

export function getAllPosts(limit?: number): PostSummary[] {
  const posts = loadPosts().map(summary);
  return limit ? posts.slice(0, limit) : posts;
}

export function getPost(slug: string): Post | undefined {
  return loadPosts().find((post) => post.slug === slug);
}

// Storyblok asset paths embed intrinsic dimensions: /f/<space>/<W>x<H>/<hash>/name.ext
const STORYBLOK_ASSET = /^https:\/\/a\.storyblok\.com\/f\/\d+\/(\d+)x(\d+)\//;

async function measure(src: string) {
  if (src.endsWith(".svg")) return null;

  const storyblok = src.match(STORYBLOK_ASSET);
  if (storyblok) {
    return { width: Number(storyblok[1]), height: Number(storyblok[2]) };
  }

  // Files under public/, e.g. /blog/<slug>/image.png.
  if (src.startsWith("/")) {
    const { width, height } = await sharp(
      path.join(PUBLIC_DIR, decodeURIComponent(src))
    ).metadata();
    return width && height ? { width, height } : null;
  }

  // Any other host is not an allowed next/image domain.
  return null;
}

// next/image needs intrinsic dimensions, so size every image the post renders:
// the cover plus each image in the body. Storyblok images and local files can
// be sized; anything else is left out and renders as a plain lazy <img>.
export async function getImageSizes(post: Post): Promise<ImageSizes> {
  const srcs = [
    post.cover,
    ...Array.from(post.body.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g), (m) => m[1]),
  ].filter((src): src is string => !!src);

  const entries = await Promise.all(
    Array.from(new Set(srcs)).map(async (src) => [src, await measure(src)] as const)
  );

  return Object.fromEntries(
    entries.filter((entry): entry is [string, { width: number; height: number }] => !!entry[1])
  );
}
