export const searchComponent = (data: any, name: string) => {
  return data.body.find((s: any) => s.component == name);
};

export type MetadataProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
