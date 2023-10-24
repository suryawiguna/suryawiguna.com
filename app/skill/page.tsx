import { getPage } from "lib/api";
import { Metadata } from "next";
import { searchComponent } from "lib/helper";
import Skills from "components/skill/skill";

export const metadata: Metadata = {
  title: "Skill",
};

export default async function Home() {
  const data = await getPage("skill");

  return (
    <div className="flex flex-col items-stretch gap-6">
      <h1 className="font-bold text-3xl">{data.title}</h1>
      <Skills blok={searchComponent(data, "skills")} />
    </div>
  );
}
