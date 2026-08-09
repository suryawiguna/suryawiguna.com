import type { MetadataRoute } from "next";
import { getAllPosts, getSitemapEntries } from "lib/api";
import { archivableTags } from "lib/tags";
import { PAGE_UPDATED, SITE_URL } from "content/site";

// Regenerated on the same cadence as the blog routes, so a post published in
// Storyblok reaches the sitemap without a redeploy. The previous next-sitemap
// postbuild step froze every entry at build time.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getSitemapEntries();

  const newestPost = posts
    .map((post: any) => post.published_at)
    .filter(Boolean)
    .sort()
    .pop();

  const staticRoutes = [
    { path: "", lastModified: PAGE_UPDATED.home, priority: 1 },
    { path: "/blog", lastModified: newestPost, priority: 0.8 },
    { path: "/portfolio", lastModified: PAGE_UPDATED.portfolio, priority: 0.8 },
    { path: "/link", lastModified: PAGE_UPDATED.link, priority: 0.5 },
  ];

  // Tag archives are derived from the posts, so they are only as fresh as the
  // newest post that carries the tag.
  const tagArchives = archivableTags((await getAllPosts()) || []).map(
    (entry) => ({
      url: `${SITE_URL}/blog/tag/${entry.slug}`,
      lastModified: new Date(newestPost ?? Date.now()),
      priority: 0.6,
    })
  );

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: new Date(route.lastModified ?? Date.now()),
      priority: route.priority,
    })),
    ...posts.map((post: any) => ({
      url: `${SITE_URL}/${post.full_slug}`,
      lastModified: new Date(post.published_at),
      priority: 0.7,
    })),
    ...tagArchives,
  ];
}
