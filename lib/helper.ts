export const searchComponent = (data: any, name: string) => {
  return data.body.find((s: any) => s.component == name);
};
