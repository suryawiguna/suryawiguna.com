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

export async function getAllPosts() {
  const data = await fetchAPI(
    `{
      PostItems(sort_by: "first_published_at:desc") {
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
            excerption
            featured_image {
              filename
            }
            categories {
              name
            }
          }
          first_published_at
        }
      }
    }
    `
  );
  return data?.PostItems.items[0];
}
