async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch("https://gapi.storyblok.com/v1/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Token: process.env.STORYBLOK_ACCESS_TOKEN,
      Version: preview ? "draft" : "published",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

// Storyblok defaults PostItems to 25 per page and caps per_page at 100, so an
// unpaginated query silently drops posts once the blog outgrows one page.
// `fields` is the PostItems selection set, minus `total`/`items`.
async function fetchAllPostItems(fields, args = "") {
  const PER_PAGE = 100;
  const items = [];
  let page = 1;
  let total = Infinity;

  while (items.length < total) {
    const data = await fetchAPI(
      `{
        PostItems(per_page: ${PER_PAGE}, page: ${page}${args ? ", " + args : ""}) {
          total
          items { ${fields} }
        }
      }`
    );

    const batch = data?.PostItems.items || [];
    total = data?.PostItems.total ?? 0;
    items.push(...batch);
    if (!batch.length) break;
    page += 1;
  }

  return items;
}

export async function getNavigation() {
  const data = await fetchAPI(
    `
      {
          NavigationItem(id: "navigation") {
            id
            content {
              menu
            }
          }
        }
        `
  );
  return data?.NavigationItem.content;
}

export async function getHome() {
  const data = await fetchAPI(
    `
    {
        PageItem(id: "home", resolve_relations:"blogPosts.posts") {
          id
          content {
            seo
            body
            title
          }
        }
      }
      `
  );
  return data?.PageItem.content;
}

export async function getPage(slug) {
  const data = await fetchAPI(
    `
    {
        PageItem(id: "${slug}") {
          id
          content {
            seo
            body
            title
          }
        }
      }
      `
  );
  return data?.PageItem.content;
}

// Storyblok returns an unticked boolean as null, so only an explicit true counts.
export const isNoindex = (post) => post?.content?.noindex === true;

// Sitemap needs real modification dates, so this reads `published_at` (which
// moves on every republish) rather than `first_published_at`.
export async function getSitemapEntries() {
  const posts = await fetchAllPostItems(
    `full_slug
     published_at
     content {
       noindex
     }`,
    `sort_by: "first_published_at:desc"`
  );

  const data = await fetchAPI(
    `{
      PageItems {
        items {
          slug
          published_at
        }
      }
    }`
  );

  const pageDates = new Map(
    (data?.PageItems.items || []).map((item) => [item.slug, item.published_at])
  );

  return {
    // Google treats a noindexed URL in a sitemap as a contradictory signal, so
    // these are dropped rather than listed.
    posts: posts.filter((post) => !isNoindex(post)),
    pageDate: (slug) => pageDates.get(slug),
  };
}

const POST_LIST_FIELDS = `content {
    excerpt
    featured_image {
      filename
    }
    categories {
      name
    }
    noindex
    _uid
  }
  slug
  full_slug
  name
  first_published_at
  tag_list`;

export async function getAllPosts(limit) {
  const sort = `sort_by: "first_published_at:desc"`;

  // A caller asking for N posts only ever needs the first page.
  if (limit) {
    const data = await fetchAPI(
      `{
        PostItems(${sort}, per_page: ${limit}) {
          items { ${POST_LIST_FIELDS} }
        }
      }`
    );
    return data?.PostItems.items;
  }

  return fetchAllPostItems(POST_LIST_FIELDS, sort);
}

export async function getFeaturedPosts() {
  const data = await fetchAPI(
    `{
      PostItems(filter_query_v2: {isFeatured: {in: "true"}}) {
        items {
          content {
            excerpt
            featured_image {
              filename
            }
            _uid
          }
          slug
          full_slug
          name
          first_published_at
        }
      }
    }`
  );
  return data?.PostItems.items;
}

export async function getPost(slug) {
  const data = await fetchAPI(
    `{
      PostItems(starts_with: "blog/", by_slugs: "blog/${slug}") {
        total
        items {
          name
          slug
          content {
            _uid
            component
            content
            excerpt
            featured_image {
              filename
            }
            categories {
              name
            }
            noindex
          }
          first_published_at
          tag_list
        }
      }
    }
    `
  );
  return data?.PostItems.items[0];
}
