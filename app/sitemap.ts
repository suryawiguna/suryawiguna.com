import type { MetadataRoute } from "next";
import { getAllPosts } from "lib/posts";
import { archivableTags } from "lib/tags";
import { PAGE_UPDATED, SITE_URL } from "content/site";

// Built with the site: posts are files, so a new or edited post ships with the
// deploy that adds it. Each post's lastModified is its frontmatter `updated`.
export default function sitemap(): MetadataRoute.Sitemap {
  const all = getAllPosts();
  // Google treats a noindexed URL in a sitemap as a contradictory signal, so
  // these are dropped rather than listed.
  const posts = all.filter((post) => !post.noindex);

  const newestPost = posts
    .map((post) => post.updated)
    .sort()
    .pop();

  const staticRoutes = [
    { path: "", lastModified: PAGE_UPDATED.home, priority: 1 },
    { path: "/services", lastModified: PAGE_UPDATED.services, priority: 0.9 },
    { path: "/blog", lastModified: newestPost, priority: 0.8 },
    { path: "/portfolio", lastModified: PAGE_UPDATED.portfolio, priority: 0.8 },
    { path: "/link", lastModified: PAGE_UPDATED.link, priority: 0.5 },
  ];

  // Tag archives are derived from the posts, so they are only as fresh as the
  // newest post that carries the tag.
  const tagArchives = archivableTags(all).map(
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
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated),
      priority: 0.7,
    })),
    ...tagArchives,
  ];
}
