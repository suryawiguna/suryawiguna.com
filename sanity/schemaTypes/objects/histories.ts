import { defineType } from "sanity";

export const histories = defineType({
  name: "histories",
  title: "Histories",
  type: "object",
  fields: [
    { name: "title", type: "string", title: "Section title" },
    {
      name: "histories",
      title: "History items",
      type: "array",
      of: [
        {
          type: "object",
          name: "history",
          fields: [
            { name: "title", type: "string", title: "Role" },
            { name: "place", type: "string", title: "Place" },
            { name: "periode", type: "string", title: "Period" },
            { name: "hide", type: "boolean", title: "Hide", initialValue: false },
          ],
          preview: { select: { title: "title", subtitle: "place" } },
        },
      ],
    },
  ],
  preview: { select: { title: "title" } },
});
