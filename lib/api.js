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
          NavigationItem(id: "navigation", resolve_relations:"blogPosts.posts") {
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
            body
            title
          }
        }
      }
      `
  );
  return data?.PageItem.content;
}
