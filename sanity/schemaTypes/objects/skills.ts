import { defineType } from "sanity";

export const skills = defineType({
  name: "skills",
  title: "Skills",
  type: "object",
  fields: [
    { name: "title", type: "string", title: "Section title" },
    {
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "object",
          name: "skill",
          fields: [{ name: "name", type: "string", title: "Name" }],
          preview: { select: { title: "name" } },
        },
      ],
    },
  ],
  preview: { select: { title: "title" } },
});
