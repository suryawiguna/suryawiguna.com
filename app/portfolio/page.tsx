import { Metadata } from "next";
import Link from "next/link";
import Portfolios from "components/portfolio/portfolios";
import ContactCta from "components/services/contactCta";
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
    // .m-page-wide widens <main> to the 1080px canvas, as on the home page.
    <div className="m-page-wide">
      <header className="m-hero m-hero-left">
        <p className="m-eyebrow">{portfolioPage.eyebrow}</p>
        <h1 className="m-h1 m-h1-wide">{portfolioPage.heading}</h1>
        <div className="m-hero-foot">
          <p className="m-lede">{portfolioPage.intro}</p>
          <div className="m-cta-row">
            <Link href="#client-work" className="m-btn primary">
              View client work
            </Link>
            <Link href="/services" className="m-btn ghost">
              Work with me
            </Link>
          </div>
        </div>
      </header>
      <Portfolios projects={visibleProjects} showcase />
      <ContactCta />
    </div>
  );
}
