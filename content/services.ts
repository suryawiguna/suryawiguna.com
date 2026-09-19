// What I sell, in one place. Both the home page's short cards and the
// /services page's detailed offers read from here, so they cannot drift apart.

import { AVATAR } from "content/site";

export type Offer = {
  // Also the value submitted by the contact form's project-type select, and
  // the fragment the home page cards link to on /services.
  slug: "marketing-site" | "shopify" | "migration";
  title: string;
  // Home page card: one short sentence.
  cardBlurb: string;
  // /services: one paragraph per entry.
  detail: string[];
  // Feeds the OfferCatalog on the ProfessionalService node. Broader than
  // `title`: it is the category, not the product name.
  serviceType: string;
};

export type Step = { title: string; line: string };
export type Sector = { name: string; blurb: string };
export type Faq = { q: string; a: string; link?: { href: string; label: string } };

// Looked up in `visibleProjects` by title, so these must match
// content/projects.ts exactly (including the macron in "Vāyu").
export type CaseStudy = {
  projectTitle: string;
  problem: string;
  built: string;
  result: string;
};

// The strongest commercial-intent post on the site. Named here so the home
// page, /services, and the blog CTA all point at the same slug.
export const CHOOSE_DEVELOPER_POST = "/blog/how-to-choose-web-developer-bali";

export const OFFERS = [
  {
    slug: "marketing-site",
    title: "Marketing site",
    cardBlurb:
      "A focused website that explains your offer and turns visits into enquiries.",
    detail: [
      "A fast, mobile-friendly site that explains your business and turns visitors into enquiries. I plan the structure, design the pages, build them in Next.js or WordPress, and handle forms and essential SEO.",
    ],
    serviceType: "Web Development",
  },
  {
    slug: "shopify",
    title: "Shopify storefront",
    cardBlurb:
      "A branded Shopify store with products, payments, and shipping ready to sell.",
    detail: [
      "A new Shopify store or a thoughtful redesign of an existing one. I customise the theme around your brand and set up the product, collection, cart, payment, and shipping experience.",
    ],
    serviceType: "E-commerce Development",
  },
  {
    slug: "migration",
    title: "Rebuild or migration",
    cardBlurb:
      "A faster, easier-to-manage rebuild that preserves your content and search traffic.",
    detail: [
      "A modern rebuild for a slow, dated, or difficult-to-update site. I move the content, preserve URLs and redirects, and rebuild it without throwing away the search traffic you already earn.",
    ],
    serviceType: "Web Development",
  },
] satisfies Offer[];

export const PROCESS = {
  title: "How it works",
  timeline:
    "Most small sites launch within two weeks. Larger builds get a clear timeline before work starts.",
  steps: [
    {
      title: "Email",
      line: "You email me the goal; I reply with the scope, price, and timeline.",
    },
    {
      title: "Design",
      line: "You review the layout before development starts.",
    },
    {
      title: "Build",
      line: "I build the site and share a live preview.",
    },
    {
      title: "Launch",
      line: "We publish it, and I show you how to update it.",
    },
  ] satisfies Step[],
};

// The Bali half of the audience. These three sectors stay open to foreign
// investment after the 2026 PT PMA restrictions, so they are where the local
// budget actually is.
export const SECTORS = {
  title: "Who I work with",
  intro:
    "I work remotely and with Bali businesses, especially these sectors.",
  items: [
    {
      name: "Villas and accommodation",
      blurb:
        "Fast, photo-led sites designed to win more direct enquiries and bookings.",
    },
    {
      name: "Cafes and restaurants",
      blurb:
        "Menus, hours, maps, and reservations that load quickly on mobile.",
    },
    {
      name: "Wellness and yoga studios",
      blurb:
        "Schedules, teacher profiles, retreat pages, and simple booking journeys.",
    },
  ] satisfies Sector[],
};

export const CASE_STUDIES = {
  title: "A couple of examples",
  items: [
    {
      projectTitle: "One Line Solutions",
      problem:
        "Its many freight services were difficult for potential clients to navigate.",
      built:
        "A WordPress site organised around individual service pages, with SEO included from the start.",
      result:
        "Clients can find and share the right service, while the team can update the site themselves.",
    },
    {
      projectTitle: "Vāyu",
      problem:
        "A new hair-care brand needed a store that did not feel like a stock Shopify theme.",
      built:
        "A customised Shopify storefront with focused product pages and a simple checkout journey.",
      result:
        "The brand launched with a distinctive store the team can expand without a developer.",
    },
  ] satisfies CaseStudy[],
};

export const FAQS = {
  title: "Questions I get asked",
  items: [
    {
      q: "What does a site cost?",
      a: "It depends on the scope and whether you are selling online. You receive a fixed price after the first email and before committing, with no surprise billing.",
    },
    {
      q: "How long does it take?",
      a: "Most small sites launch within two weeks. Stores with many products or custom features take longer, and you will know the timeline upfront.",
      link: {
        href: CHOOSE_DEVELOPER_POST,
        label: "More on spotting unrealistic timelines",
      },
    },
    {
      q: "Can you work with me if I am not in Bali?",
      a: "Yes. I work with remote clients through email and a shared preview link, so time differences rarely get in the way.",
    },
    {
      q: "What happens after launch?",
      a: "You own the domain, hosting, code, and content. I show you how to edit the site, and you can manage it yourself or retain me for support. There is no lock-in.",
    },
  ] satisfies Faq[],
};

export const servicesSeo = {
  title: "Web Development Services in Bali | Surya Wiguna",
  description:
    "Freelance web developer in Bali. Marketing sites, Shopify storefronts, and rebuilds for villas, cafes, wellness studios, and remote founders. Most sites live in under two weeks.",
  ogImage: AVATAR.src,
};

export const servicesPage = {
  h1: "Web developer in Bali for small businesses and founders",
  intro: [
    "I build fast marketing sites and Shopify stores for businesses in Bali and founders working remotely, from strategy and design through launch.",
  ],
  // Used by the parked contact form, see contactCta below.
  contactHeading: "Tell me about your project",
  contactIntro:
    "Fill this in and I will come back to you with a price and a timeline. No obligation, and I will tell you if I am not the right fit.",
};

// Soft CTA at the foot of /services. This is a mailto rather than the form in
// components/services/contactForm.tsx: Brevo accepted the test sends but the
// mail never arrived, so the form is parked until delivery is sorted out
// rather than shipped as a lead sink that silently loses enquiries.
export const contactCta = {
  heading: "Tell me about your project",
  body: [
    "Email me what you are building and when you need it. I will reply with a price, a timeline, and an honest view of whether I am the right fit.",
  ],
  subject: "Project enquiry",
  label: "Email me",
};

// Rendered under every blog post. The audit for internal linking opportunities
// is handled once here rather than by editing individual posts in Storyblok.
export const blogCta = {
  heading: "Need a site building?",
  body: "I am a freelance web developer in Bali. Marketing sites, Shopify stores, and rebuilds, usually live in under two weeks.",
  href: "/services",
  label: "See what I do",
};
