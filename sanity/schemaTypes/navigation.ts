import { defineType } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    {
      name: "menu",
      title: "Menu",
      type: "array",
      of: [
        {
          type: "object",
          name: "menuItem",
          fields: [
            { name: "text", type: "string", title: "Label" },
            { name: "url", type: "string", title: "URL" },
          ],
          preview: { select: { title: "text", subtitle: "url" } },
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: "Navigation" }) },
});
