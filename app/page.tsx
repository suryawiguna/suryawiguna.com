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
  const histories = data.body.filter(
    (blok: any) => blok.component == "histories"
  );

  return (
    <>
      <Introduction blok={searchComponent(data, "introduction")} />
      <Portfolios blok={searchComponent(data, "portfolios")} />
      <section id="about" className="m-section">
        <div className="m-cols">
          {histories.map((blok: any, key: number) => (
            <Histories key={key} blok={blok} />
          ))}
        </div>
        <Skills blok={searchComponent(data, "skills")} />
      </section>
      <BlogPosts blok={searchComponent(data, "blogPosts")} />
    </>
  );
}
