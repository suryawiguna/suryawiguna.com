import type { PostSummary } from "lib/posts";

// Most posts carry no tags and only nine carry a category, so tag matching
// alone would fall through to "two newest posts" — which is what this replaces.
// Title/excerpt overlap keeps the fallback topical until the tag backfill lands.
const TAG_WEIGHT = 6;
const CATEGORY_WEIGHT = 3;
const TERM_WEIGHT = 1;
const MAX_TERM_SCORE = 6;

const STOP_WORDS = new Set(
  `a an and are as at be but by can do does for from has have how i in is it
   its me my of on or should that the this to use using was what when where
   which who why will with you your`.split(/\s+/)
);

const terms = (post: PostSummary): string[] => {
  const source = `${post.title} ${post.excerpt}`;
  const words = source
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !STOP_WORDS.has(word));
  return Array.from(new Set(words));
};

const overlap = (a: string[], b: Set<string>) =>
  a.filter((item) => b.has(item)).length;

export function findRelatedPosts(
  current: PostSummary,
  all: PostSummary[],
  limit = 2
) {
  const currentTags = new Set(current.tags);
  const currentCategories = new Set(current.categories);
  const currentTerms = new Set(terms(current));

  return all
    // Never recommend a post we've asked Google not to index.
    .filter((post) => post.slug !== current.slug && !post.noindex)
    .map((post) => ({
      post,
      score:
        overlap(post.tags, currentTags) * TAG_WEIGHT +
        overlap(post.categories, currentCategories) * CATEGORY_WEIGHT +
        Math.min(overlap(terms(post), currentTerms) * TERM_WEIGHT, MAX_TERM_SCORE),
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        // Recency only breaks ties, rather than driving the whole list.
        b.post.date.localeCompare(a.post.date)
    )
    .slice(0, limit)
    .map((entry) => entry.post);
}
