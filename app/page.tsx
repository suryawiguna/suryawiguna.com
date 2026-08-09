import Introduction from "components/home/introduction";
import Histories from "components/experience/histories";
import Skills from "components/skill/skill";
import JsonLd from "components/jsonLd";
import Portfolios from "components/portfolio/portfolios";
import Offers from "components/services/offers";
import Process from "components/services/process";

// BlogPosts is an async server component — it must be a static import so its
// post links land in the server-rendered HTML. Loading it via next/dynamic
// with `ssr: false` kept the whole section (and every /blog/* link on the
// homepage) out of the served markup.
import BlogPosts from "components/home/blogPosts";

import {
  education,
  experiences,
  homeSeo,
  skills,
  worksListName,
  worksTitle,
} from "content/home";
import { featuredProjects } from "content/projects";
import { CHOOSE_DEVELOPER_POST, OFFERS, PROCESS } from "content/services";
import { SITE_URL } from "content/site";
import {
  PERSON_ID,
  WEBSITE_ID,
  businessNode,
  personNode,
  websiteNode,
} from "lib/jsonLd";

import type { Metadata } from "next";

function generateHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(),
      websiteNode(),
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: homeSeo.title,
        description: homeSeo.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      businessNode(),
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
      <Offers
        heading="What I do"
        offers={OFFERS}
        more={{ href: "/services", label: "See the full detail and prices →" }}
      />
      <Portfolios projects={featuredProjects} heading={worksTitle} />
      <Process
        heading={PROCESS.title}
        timeline={PROCESS.timeline}
        steps={PROCESS.steps}
        more={{
          href: CHOOSE_DEVELOPER_POST,
          label: "How to choose the right web developer in Bali →",
        }}
      />
      <BlogPosts />
      <section id="about" className="m-section">
        <div className="m-cols">
          <Histories title={experiences.title} items={experiences.items} />
          <Histories title={education.title} items={education.items} />
        </div>
        <Skills title={skills.title} items={skills.items} />
      </section>
      <JsonLd data={generateHomeJsonLd()} />
    </>
  );
}
