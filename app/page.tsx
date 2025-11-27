import { getHome } from "lib/api";
import Introduction from "components/home/introduction";
import Histories from "components/experience/histories";
import Skills from "components/skill/skill";
import { searchComponent } from "lib/helper";
import dynamic from "next/dynamic";

const BlogPosts = dynamic(() => import("../components/home/blogPosts"), {
  ssr: false,
});
const Portfolios = dynamic(() => import("../components/portfolio/portfolios"));

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
      type: "website",
    },
  };
}

export default async function Home() {
  const data = await getHome();

  return (
    <div className="flex flex-col items-stretch">
      <h1 className="text-2xl md:text-3xl mb-4">{data.title}</h1>
      <div className="flex flex-col gap-12 md:gap-16">
        <Introduction blok={searchComponent(data, "introduction")} />
        <Portfolios blok={searchComponent(data, "portfolios")} />
        <div className="grid md:grid-cols-2 gap-4">
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
