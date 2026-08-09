import JsonLd from "components/jsonLd";
import Offers from "components/services/offers";
import Sectors from "components/services/sectors";
import Process from "components/services/process";
import CaseStudies from "components/services/caseStudies";
import Faqs from "components/services/faq";
import ContactForm from "components/services/contactForm";

import {
  CASE_STUDIES,
  FAQS,
  OFFERS,
  PROCESS,
  SECTORS,
  servicesPage,
  servicesSeo,
} from "content/services";
import { SITE_URL } from "content/site";
import {
  AREA_SERVED,
  BUSINESS_ID,
  PERSON_ID,
  WEBSITE_ID,
  breadcrumbNode,
  businessNode,
} from "lib/jsonLd";

import type { Metadata } from "next";

const PAGE_URL = `${SITE_URL}/services`;

function generateServicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: servicesSeo.title,
        description: servicesSeo.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": BUSINESS_ID },
        primaryImageOfPage: servicesSeo.ogImage,
        inLanguage: "en",
      },
      // Repeated from the home page on purpose: same @id, so consumers merge
      // the two into one business rather than seeing two.
      businessNode(),
      // The three things actually for sale, which is a narrower list than the
      // SERVICES catalog on the business node.
      ...OFFERS.map((offer) => ({
        "@type": "Service",
        "@id": `${PAGE_URL}#${offer.slug}`,
        name: offer.title,
        description: offer.detail[0],
        serviceType: offer.title,
        provider: { "@id": BUSINESS_ID },
        areaServed: AREA_SERVED,
      })),
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQS.items.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      breadcrumbNode([
        { name: "Home", item: SITE_URL },
        { name: "Services", item: PAGE_URL },
      ]),
      { "@type": "Person", "@id": PERSON_ID, url: SITE_URL },
    ],
  };
}

export const metadata: Metadata = {
  title: servicesSeo.title,
  description: servicesSeo.description,
  alternates: {
    canonical: `/services`,
  },
  openGraph: {
    images: [servicesSeo.ogImage],
    url: PAGE_URL,
    type: "website",
  },
};

export default function Services() {
  return (
    <>
      <header className="m-hero">
        <h1 className="m-h1 m-h1-wide">{servicesPage.h1}</h1>
        <div className="m-lede">
          {servicesPage.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </header>

      <Offers heading="What I build" offers={OFFERS} detailed />
      <Sectors
        heading={SECTORS.title}
        intro={SECTORS.intro}
        items={SECTORS.items}
      />
      <Process
        heading={PROCESS.title}
        timeline={PROCESS.timeline}
        steps={PROCESS.steps}
      />
      <CaseStudies
        heading={CASE_STUDIES.title}
        items={CASE_STUDIES.items}
        more={{ href: "/portfolio", label: "All projects →" }}
      />
      <Faqs heading={FAQS.title} items={FAQS.items} />
      <ContactForm />

      <JsonLd data={generateServicesJsonLd()} />
    </>
  );
}
