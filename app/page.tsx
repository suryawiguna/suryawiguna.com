import { getHome } from "lib/api";
import Introduction from "components/home/introduction";
import Portfolios from "components/portfolio/portfolios";
import Histories from "components/experience/histories";
import BlogPosts from "components/home/blogPosts";
import Skills from "components/skill/skill";
import { searchComponent } from "lib/helper";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const data = await getHome();

  return {
    title: data.seo.title,
    description: data.seo.description,
    alternates: {
      canonical: `/`,
    },
    openGraph: {
      images: [data.seo.og_image],
      url: "https://suryawiguna.com/",
    },
  };
}

export default async function Home() {
  const data = await getHome();

  return (
    <div className="flex flex-col items-stretch gap-8">
      <h1 className="text-3xl">{data.title}</h1>
      <div className="flex flex-col gap-20">
        <Introduction blok={searchComponent(data, "introduction")} />
        <Portfolios blok={searchComponent(data, "portfolios")} />
        <div className="grid md:grid-cols-2 gap-8">
          {data.body.map(
            (blok: any, key: number) =>
              blok.component == "histories" && (
                <Histories key={key} blok={blok} />
              )
          )}
        </div>
        <Skills blok={searchComponent(data, "skills")} />
        <BlogPosts blok={searchComponent(data, "blogPosts")} />
      </div>
    </div>
  );
}
