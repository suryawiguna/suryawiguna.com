import { defineType } from "sanity";

export const links = defineType({
  name: "links",
  title: "Links",
  type: "object",
  fields: [
    {
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "linkItem",
          fields: [
            { name: "name", type: "string", title: "Label" },
            { name: "url", type: "url", title: "URL" },
            {
              name: "socialLink",
              type: "boolean",
              title: "Social link (shown as chip)",
              initialValue: false,
            },
            {
              name: "linktype",
              type: "string",
              title: "Link type",
              initialValue: "url",
              options: {
                list: [
                  { title: "External URL", value: "url" },
                  { title: "Internal", value: "story" },
                ],
              },
            },
          ],
          preview: { select: { title: "name", subtitle: "url" } },
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: "Links" }) },
});
