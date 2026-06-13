import { defineType } from "sanity";

/**
 * Marker block — the BlogPosts component fetches recent posts itself.
 * Kept as a body block so page ordering is preserved.
 */
export const blogPosts = defineType({
  name: "blogPosts",
  title: "Blog posts section",
  type: "object",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title (optional)",
      description: "Not rendered; the component shows recent posts automatically.",
    },
  ],
  preview: { prepare: () => ({ title: "Recent blog posts" }) },
});
