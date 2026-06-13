import { getSanityClient } from "./sanityClient";

/**
 * Sanity data layer. Every export returns the SAME shape as lib/storyblok.js
 * so pages/components don't change. Field names are mapped back to the legacy
 * Storyblok names (name, first_published_at, full_slug, content.featured_image
 * .filename, etc.) inside the GROQ projections.
 *
 * Rich-text fields (description / excerpt / content) are returned as Portable
 * Text arrays; the shared <RichText> component detects the array and renders
 * them via @portabletext/react.
 */

// Shared projection for page body blocks. Maps each block to the legacy
// `component` name and rewrites images/links to the Storyblok-style shape.
const BODY = `body[]{
  "component": _type,
  _type == "introduction" => {
    "image": image{ "filename": asset->url, "alt": alt },
    description
  },
  _type == "portfolios" => {
    "items": items[]{
      title, category, hide,
      "image": image{ "filename": asset->url, "alt": alt },
      "link": { "url": url },
      description
    }
  },
  _type == "histories" => {
    title,
    "histories": histories[]{ title, place, periode, hide }
  },
  _type == "skills" => {
    title,
    "skills": skills[]{ name }
  },
  _type == "blogPosts" => { title },
  _type == "links" => {
    "links": links[]{ name, "link": { "url": url, "cached_url": url }, linktype, socialLink }
  }
}`;

const POST_LIST_FIELDS = `
  "slug": slug.current,
  "full_slug": "blog/" + slug.current,
  "name": title,
  "first_published_at": publishedAt,
  "tag_list": tags,
  "content": {
    "excerpt": excerpt,
    "featured_image": featuredImage{ "filename": asset->url, "alt": alt },
    "_uid": _id
  }`;

export async function getNavigation() {
  const data = await getSanityClient().fetch(
    `*[_type == "navigation"][0]{
      "menu": menu[]{ "_uid": _key, text, "link": { "url": url } }
    }`
  );
  return data || { menu: [] };
}

export async function getHome() {
  return getSanityClient().fetch(
    `*[_type == "page" && pageId == "home"][0]{ title, seo, ${BODY} }`
  );
}

export async function getPage(slug: string) {
  return getSanityClient().fetch(
    `*[_type == "page" && pageId == $slug][0]{ title, seo, ${BODY} }`,
    { slug }
  );
}

export async function getAllPosts(limit?: number) {
  const slice = limit ? `[0...${limit}]` : "";
  return getSanityClient().fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)${slice}{${POST_LIST_FIELDS}}`
  );
}

export async function getFeaturedPosts() {
  return getSanityClient().fetch(
    `*[_type == "post" && isFeatured == true && defined(slug.current)] | order(publishedAt desc){${POST_LIST_FIELDS}}`
  );
}

export async function getPost(slug: string) {
  return getSanityClient().fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      "name": title,
      "slug": slug.current,
      "first_published_at": publishedAt,
      "tag_list": tags,
      "content": {
        "_uid": _id,
        "component": "post",
        "content": body,
        "excerpt": excerpt,
        "featured_image": featuredImage{ "filename": asset->url, "alt": alt },
        "categories": categories[]{ "name": @ }
      }
    }`,
    { slug }
  );
}
