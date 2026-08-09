// A tag archive is only worth a URL if it groups several posts. Below this a
// tag produces a near-empty page that competes with the posts it links to,
// which is the opposite of what these pages are for.
export const MIN_POSTS_PER_TAG = 3;

export const tagSlug = (tag: string) =>
  tag
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const isIndexable = (post: any) => post?.content?.noindex !== true;

export const postsForTag = (posts: any[], tag: string) =>
  posts.filter(
    (post) => isIndexable(post) && (post.tag_list || []).includes(tag)
  );

// Tags that clear the threshold, paired with the slug their archive lives at.
export function archivableTags(posts: any[]) {
  const counts = new Map<string, number>();
  for (const post of posts.filter(isIndexable)) {
    for (const tag of post.tag_list || []) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .filter(([, count]) => count >= MIN_POSTS_PER_TAG)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, slug: tagSlug(tag), count }));
}

export const tagFromSlug = (posts: any[], slug: string) =>
  archivableTags(posts).find((entry) => entry.slug === slug)?.tag;
