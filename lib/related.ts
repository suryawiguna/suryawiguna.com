import { richTextToPlain } from "lib/helper";

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

const terms = (post: any): string[] => {
  const source = `${post.name} ${richTextToPlain(post.content?.excerpt)}`;
  const words = source
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !STOP_WORDS.has(word));
  return Array.from(new Set(words));
};

const names = (post: any): string[] =>
  (post.content?.categories || []).map((category: any) => category.name);

const overlap = (a: string[], b: Set<string>) =>
  a.filter((item) => b.has(item)).length;

export function findRelatedPosts(current: any, all: any[], limit = 2) {
  const currentTags = new Set<string>(current.tag_list || []);
  const currentCategories = new Set<string>(names(current));
  const currentTerms = new Set(terms(current));

  return all
    .filter((post) => post.slug !== current.slug)
    .map((post) => ({
      post,
      score:
        overlap(post.tag_list || [], currentTags) * TAG_WEIGHT +
        overlap(names(post), currentCategories) * CATEGORY_WEIGHT +
        Math.min(overlap(terms(post), currentTerms) * TERM_WEIGHT, MAX_TERM_SCORE),
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        // Recency only breaks ties, rather than driving the whole list.
        Date.parse(b.post.first_published_at) -
          Date.parse(a.post.first_published_at)
    )
    .slice(0, limit)
    .map((entry) => entry.post);
}
