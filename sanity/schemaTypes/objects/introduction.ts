import { defineType } from "sanity";

export const introduction = defineType({
  name: "introduction",
  title: "Introduction",
  type: "object",
  fields: [
    {
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    },
    { name: "description", type: "blockContent", title: "Description" },
  ],
  preview: { prepare: () => ({ title: "Introduction" }) },
});
