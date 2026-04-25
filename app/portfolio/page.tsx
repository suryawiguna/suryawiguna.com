import { getPage } from "lib/api";
import { Metadata } from "next";
import { searchComponent } from "lib/helper";
import Portfolios from "components/portfolio/portfolios";

export const metadata: Metadata = {
  title: "Web Developer Bali Portfolio | Surya Wiguna",
  description: "Check out my portfolios",
  alternates: {
    canonical: `/portfolio`,
  },
  openGraph: {
    images: ["https://a.storyblok.com/f/169901/877x895/eed121f43d/me.jpeg"],
    url: "https://suryawiguna.com/portfolio",
    type: "website",
  },
};

export default async function Home() {
  const data = await getPage("portfolio");

  return (
    <section className="m-section" style={{ borderTop: 0 }}>
      <h1 className="m-h2" style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.4rem)" }}>
        {data.title}
      </h1>
      <Portfolios blok={searchComponent(data, "portfolios")} />
    </section>
  );
}
