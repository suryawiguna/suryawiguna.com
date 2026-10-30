import { getAllPosts } from "lib/posts";
import { SITE_NAME, SITE_URL } from "content/site";

// RSS 2.0 feed of the blog, at /feed.xml. Built with the site, like the
// sitemap: posts are files, so a new post reaches feed readers with the deploy
// that adds it. Same posts as the sitemap, so noindex ones stay out.
export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// RSS wants RFC 822 dates; toUTCString() is that format.
const rssDate = (iso: string) => new Date(iso).toUTCString();

export function GET() {
  const posts = getAllPosts().filter((post) => !post.noindex);
  const feedUrl = `${SITE_URL}/feed.xml`;
  const newest = posts
    .map((post) => post.updated)
    .sort()
    .pop();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rssDate(post.date)}</pubDate>`,
        `      <description>${escapeXml(post.excerpt)}</description>`,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE_NAME} blog`)}</title>
    <link>${SITE_URL}/blog</link>
    <description>Articles about web development, client work and the tools behind them, by ${escapeXml(SITE_NAME)}, a web developer in Bali.</description>
    <language>en</language>
    ${newest ? `<lastBuildDate>${rssDate(newest)}</lastBuildDate>` : ""}
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
