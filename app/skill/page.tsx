import { getPage } from "lib/api";
import { Metadata } from "next";
import { searchComponent } from "lib/helper";
import Skills from "components/skill/skill";

export const metadata: Metadata = {
  title: "Skill",
  description:
    "See my skills from Next.js, Wordpress, Shopify, to Tailwind and Node.js",
  alternates: {
    canonical: `/skill`,
  },
};

export default async function Home() {
  const data = await getPage("skill");

  return (
    <div className="flex flex-col items-stretch gap-6">
      <h1 className="text-3xl">{data.title}</h1>
      <Skills blok={searchComponent(data, "skills")} />
    </div>
  );
}
