import { getPage } from "lib/api";
import { Metadata } from "next";
import { searchComponent } from "lib/helper";
import Histories from "components/experience/histories";

export const metadata: Metadata = {
  title: "Experience",
};

export default async function Home() {
  const data = await getPage("experience");

  return (
    <div className="flex flex-col items-stretch gap-6">
      <h1 className="font-bold text-3xl">{data.title}</h1>
      <Histories blok={searchComponent(data, "histories")} />
    </div>
  );
}
