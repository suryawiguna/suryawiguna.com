import { defineType } from "sanity";

export const portfolios = defineType({
  name: "portfolios",
  title: "Portfolios",
  type: "object",
  fields: [
    {
      name: "items",
      title: "Work items",
      type: "array",
      of: [
        {
          type: "object",
          name: "work",
          fields: [
            { name: "title", type: "string", title: "Title" },
            {
              name: "image",
              type: "image",
              title: "Image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Alt text" }],
            },
            { name: "description", type: "blockContent", title: "Description" },
            {
              name: "category",
              type: "array",
              title: "Category",
              of: [{ type: "string" }],
            },
            { name: "url", type: "url", title: "Link" },
            { name: "hide", type: "boolean", title: "Hide", initialValue: false },
          ],
          preview: { select: { title: "title", media: "image" } },
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: "Portfolios" }) },
});
