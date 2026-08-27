import { Metadata } from "next";
import Portfolios from "components/portfolio/portfolios";
import { portfolioPage, visibleProjects } from "content/projects";
import { SITE_URL } from "content/site";

export const metadata: Metadata = {
  title: portfolioPage.seo.title,
  description: portfolioPage.seo.description,
  alternates: {
    canonical: `/portfolio`,
  },
  openGraph: {
    images: [portfolioPage.seo.ogImage],
    url: `${SITE_URL}/portfolio`,
    type: "website",
  },
};

export default function Portfolio() {
  return (
    <>
      <header className="m-hero m-hero-left">
        <h1 className="m-h1 m-h1-wide">{portfolioPage.heading}</h1>
      </header>
      <Portfolios projects={visibleProjects} />
    </>
  );
}
