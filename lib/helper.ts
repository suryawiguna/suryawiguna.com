export const searchComponent = (data: any, name: string) => {
  return data.body.find((s: any) => s.component == name);
};

/**
 * Build a tiny thumbnail URL for use as a blur-up placeholder. Storyblok and
 * Sanity expose different image-transform syntaxes, so pick based on the host.
 */
export const blurThumb = (url?: string): string | undefined => {
  if (!url) return undefined;
  if (url.includes("a.storyblok.com")) return `${url}/m/40x40`;
  if (url.includes("cdn.sanity.io")) return `${url}?w=40&h=40&fit=crop&q=30`;
  return url;
};

export type MetadataProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
