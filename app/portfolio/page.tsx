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
    <section className="m-section" style={{ borderTop: 0 }}>
      <h1 className="m-h2" style={{ fontSize: "var(--text-3xl)" }}>
        {portfolioPage.heading}
      </h1>
      <Portfolios projects={visibleProjects} />
    </section>
  );
}
