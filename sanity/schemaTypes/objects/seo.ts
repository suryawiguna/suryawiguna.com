import { defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "description", type: "text", title: "Description", rows: 3 },
    { name: "og_image", type: "url", title: "OG image URL" },
  ],
});
