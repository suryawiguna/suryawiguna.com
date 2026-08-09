import Introduction from "components/home/introduction";
import Histories from "components/experience/histories";
import Skills from "components/skill/skill";
import JsonLd from "components/jsonLd";
import Portfolios from "components/portfolio/portfolios";

// BlogPosts is an async server component — it must be a static import so its
// post links land in the server-rendered HTML. Loading it via next/dynamic
// with `ssr: false` kept the whole section (and every /blog/* link on the
// homepage) out of the served markup.
import BlogPosts from "components/home/blogPosts";

import {
  education,
  experiences,
  hero,
  homeSeo,
  skills,
  worksListName,
  worksTitle,
} from "content/home";
import { featuredProjects } from "content/projects";
import {
  BUSINESS_DESCRIPTION,
  EMAIL,
  LOCATION,
  SERVICES,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
} from "content/site";

import type { Metadata } from "next";

const PERSON_ID = `${SITE_URL}/#person`;

const ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: LOCATION.locality,
  addressCountry: LOCATION.country,
};

function generateHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE_NAME,
        url: SITE_URL,
        image: hero.image.src,
        jobTitle: "Freelance Web Developer",
        description: homeSeo.description,
        email: `mailto:${EMAIL}`,
        address: ADDRESS,
        knowsAbout: skills.items,
        alumniOf: education.items.map((item) => ({
          "@type": "CollegeOrUniversity",
          name: item.place,
        })),
        worksFor: experiences.items
          .filter((item) => item.current)
          .map((item) => ({ "@type": "Organization", name: item.place })),
        sameAs: SOCIAL_PROFILES,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: "Freelance Web Developer Bali",
        publisher: { "@id": PERSON_ID },
        inLanguage: "en",
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: homeSeo.title,
        description: homeSeo.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: `${SITE_NAME} — Freelance Web Developer Bali`,
        url: SITE_URL,
        image: hero.image.src,
        description: BUSINESS_DESCRIPTION,
        email: `mailto:${EMAIL}`,
        founder: { "@id": PERSON_ID },
        sameAs: SOCIAL_PROFILES,
        address: ADDRESS,
        areaServed: [
          { "@type": "Place", name: "Bali" },
          { "@type": "Country", name: "Indonesia" },
          { "@type": "Place", name: "Worldwide" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web Development Services",
          itemListElement: SERVICES.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              serviceType: service.serviceType,
              // The Service sits inside the business's catalog, but linking the
              // provider explicitly survives consumers that flatten the graph.
              provider: { "@id": `${SITE_URL}/#business` },
            },
          })),
        },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#works`,
        name: worksListName,
        itemListElement: featuredProjects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            url: project.href,
            image: project.image?.src,
            keywords: project.categories.join(", "),
            creator: { "@id": PERSON_ID },
          },
        })),
      },
    ],
  };
}

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  alternates: {
    canonical: `/`,
  },
  openGraph: {
    images: [homeSeo.ogImage],
    url: `${SITE_URL}/`,
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Introduction />
      <Portfolios projects={featuredProjects} heading={worksTitle} />
      <section id="about" className="m-section">
        <div className="m-cols">
          <Histories title={experiences.title} items={experiences.items} />
          <Histories title={education.title} items={education.items} />
        </div>
        <Skills title={skills.title} items={skills.items} />
      </section>
      <BlogPosts />
      <JsonLd data={generateHomeJsonLd()} />
    </>
  );
}
