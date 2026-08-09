export const searchComponent = (data: any, name: string) => {
  return data.body.find((s: any) => s.component == name);
};

// Excerpts are sometimes a plain string and sometimes Storyblok rich-text JSON.
export const richTextToPlain = (value: any): string => {
  if (!value) return "";
  if (typeof value === "string") return value;

  const parts: string[] = [];
  const walk = (node: any) => {
    if (!node) return;
    if (typeof node.text === "string") parts.push(node.text);
    if (Array.isArray(node.content)) node.content.forEach(walk);
  };
  walk(value);
  return parts.join(" ").trim();
};

export type MetadataProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
