import { defineType } from "sanity";

/**
 * Portable Text used for all rich-text fields (intro/work descriptions,
 * post excerpt + body). Mirrors the marks/nodes the Storyblok renderer
 * supported: bold, inline code, code blocks, lists.
 *
 * The array members are cast to `any` because TS can't reliably narrow the
 * `block` member union under this project's config — the schema itself is valid.
 */
export const blockContent = defineType({
  name: "blockContent",
  title: "Rich text",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [{ name: "href", type: "url", title: "URL" }],
          },
        ],
      },
    },
    // Code block -> rendered with react-syntax-highlighter (one-dark).
    {
      type: "object",
      name: "code",
      title: "Code block",
      fields: [
        { name: "language", type: "string", title: "Language" },
        { name: "code", type: "text", title: "Code" },
      ],
      preview: {
        select: { language: "language", code: "code" },
        prepare: ({ language, code }: Record<string, any>) => ({
          title: `<code> ${language || ""}`,
          subtitle: (code || "").slice(0, 60),
        }),
      },
    },
  ] as any,
});
