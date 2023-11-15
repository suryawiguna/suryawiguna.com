import { getPage } from "lib/api";
import { Metadata } from "next";
import { searchComponent } from "lib/helper";
import Histories from "components/education/histories";

export const metadata: Metadata = {
  title: "Education",
  description: "Here is described what education that I took.",
};

export default async function Home() {
  const data = await getPage("education");

  return (
    <div className="flex flex-col items-stretch gap-6">
      <h1 className="font-bold text-3xl">{data.title}</h1>
      <Histories blok={searchComponent(data, "histories")} />
    </div>
  );
}
