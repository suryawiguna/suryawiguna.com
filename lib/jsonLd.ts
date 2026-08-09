// Shared schema.org nodes. The home page and /services both describe the same
// person and the same one-person business, and they have to agree on the @id
// values for consumers to merge them into one entity, so the definitions live
// here rather than being copied per page.

import { education, experiences, hero, homeSeo, skills } from "content/home";
import { OFFERS } from "content/services";
import {
  BUSINESS_DESCRIPTION,
  EMAIL,
  LOCATION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
} from "content/site";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BUSINESS_ID = `${SITE_URL}/#business`;

export const ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: LOCATION.locality,
  addressCountry: LOCATION.country,
};

export const AREA_SERVED = [
  { "@type": "Place", name: "Bali" },
  { "@type": "Country", name: "Indonesia" },
  { "@type": "Place", name: "Worldwide" },
];

export function personNode() {
  return {
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
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: "Freelance Web Developer Bali",
    publisher: { "@id": PERSON_ID },
    inLanguage: "en",
  };
}

export function businessNode() {
  return {
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: `${SITE_NAME} — Freelance Web Developer Bali`,
    url: SITE_URL,
    image: hero.image.src,
    description: BUSINESS_DESCRIPTION,
    email: `mailto:${EMAIL}`,
    founder: { "@id": PERSON_ID },
    sameAs: SOCIAL_PROFILES,
    address: ADDRESS,
    areaServed: AREA_SERVED,
    // Built from OFFERS so the catalog describes the same three things the
    // pages sell. It used to be a separate four-item list in content/site.ts,
    // which meant the copy and the schema described different businesses.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: OFFERS.map((offer) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: offer.title,
          serviceType: offer.serviceType,
          // The Service sits inside the business's catalog, but linking the
          // provider explicitly survives consumers that flatten the graph.
          provider: { "@id": BUSINESS_ID },
        },
      })),
    },
  };
}

export function breadcrumbNode(trail: { name: string; item: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}
