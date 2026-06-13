import { defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    {
      name: "pageId",
      title: "Page ID",
      type: "string",
      description: 'Stable identifier used by the site (e.g. "home", "portfolio", "link").',
      validation: (Rule) => Rule.required(),
    },
    { name: "title", title: "Title", type: "string" },
    { name: "seo", title: "SEO", type: "seo" },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "introduction" },
        { type: "portfolios" },
        { type: "histories" },
        { type: "skills" },
        { type: "blogPosts" },
        { type: "links" },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "pageId" },
  },
});
