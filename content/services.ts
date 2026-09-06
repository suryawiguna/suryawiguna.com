// What I sell, in one place. Both the home page ("What I do" and "How it
// works") and the /services page read from here, so the short and long
// versions of an offer can never drift apart.

import { AVATAR } from "content/site";

export type Offer = {
  // Also the value submitted by the contact form's project-type select, and
  // the fragment the home page cards link to on /services.
  slug: "marketing-site" | "shopify" | "migration";
  title: string;
  // Home page card: two to three sentences.
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
      "Four to six pages that explain what you sell. Usually WordPress, so you can edit it yourself. Next.js when speed matters more than editing.",
    detail: [
      "This is most of what I do. A few pages that say what you sell, load quickly, and read well on a phone.",
      "I plan the structure with you, design it, then build it. Usually WordPress, so you can log in and change the copy yourself. I also build in Next.js — this site is one — which is faster but needs me for content changes. Either way it includes the pages, a contact form, and the basic SEO setup.",
    ],
    serviceType: "Web Development",
  },
  {
    slug: "shopify",
    title: "Shopify storefront",
    cardBlurb:
      "A new store with the theme customised to match your brand. Or work on the theme and pages of a store you already have.",
    detail: [
      "Shopify handles payments, stock, shipping, and taxes. The part it leaves to you is how the store looks.",
      "I set up the store and customise the theme to match your brand: product pages, collections, cart, and checkout. I have built a store from scratch (Vāyu) and worked inside an existing one on design and single pages (Stryv), so either is fine.",
    ],
    serviceType: "E-commerce Development",
  },
  {
    slug: "migration",
    title: "Rebuild or migration",
    cardBlurb:
      "Your site is slow or hard to update. I move the content, redirect the old URLs, and rebuild the front end.",
    detail: [
      "Old sites get slow and awkward. Plugins pile up, the theme stops being supported, and every small change turns into a job.",
      "I move the content across, set up redirects so the old URLs still work, and rebuild the front end. So far the only one I have done is this site, moved from Gridsome to Next.js. Worth knowing before you decide.",
    ],
    serviceType: "Web Development",
  },
] satisfies Offer[];

export const PROCESS = {
  title: "How it works",
  timeline:
    "A small site usually takes two to three weeks, depending on how quickly the content and photos arrive. Bigger builds take longer.",
  steps: [
    {
      title: "Email",
      line: "You email me what you sell and who buys it. I reply with a price and a timeline.",
    },
    {
      title: "Design",
      line: "I send you the layout before I start building. Changes are easy at this stage.",
    },
    {
      title: "Build",
      line: "I build it. You follow along on a preview link.",
    },
    {
      title: "Launch",
      line: "It goes live and I show you how to edit the content.",
    },
  ] satisfies Step[],
};

// The Bali side of the audience. These three sectors stay open to foreign
// investment after the 2026 PT PMA restrictions. None of them is in the
// portfolio yet, so `intro` says what has actually been built and frames
// these as the work being sought rather than work already done.
export const SECTORS = {
  title: "Who I work with",
  intro:
    "Most of my clients are in Bali. So far I have built for a cargo company, a dental clinic, an entertainment company, a swim school, and a hair care brand. These three are the kind of work I am looking for next.",
  items: [
    {
      name: "Villas and accommodation",
      blurb:
        "Photo-heavy pages that load fast, clear rates, and an enquiry form, so guests can book with you directly instead of through a platform.",
    },
    {
      name: "Cafes and restaurants",
      blurb:
        "Menu, location, hours, and reservations on a page that opens quickly on a phone. Plus the Google Business setup.",
    },
    {
      name: "Wellness and yoga studios",
      blurb:
        "Schedules, teacher profiles, retreat pages, and class bookings, set up so you can update the timetable yourself.",
    },
  ] satisfies Sector[],
};

export const CASE_STUDIES = {
  title: "A couple of examples",
  items: [
    {
      projectTitle: "One Line Solutions",
      problem:
        "A Bali cargo and shipping company with a wide range of services, air freight, sea freight, door to door, warehousing, cross trade, and no clear way for a potential client to work out which one they needed.",
      built:
        "A WordPress site structured around the services rather than the company history, with each service on its own page so it can be found and linked directly. Search setup handled at the same time as the build, not bolted on later.",
      result:
        "Each service has its own page, and the team can add or edit them without a developer.",
    },
    {
      projectTitle: "Vāyu",
      problem:
        "A new hair care brand launching with no store, and a brand identity they wanted the store to reflect.",
      built:
        "Their first Shopify store, with the theme customised around the brand: product pages that explain the problem each product solves, and a checkout flow kept short.",
      result:
        "They launched with the store and can add products themselves as the range grows.",
    },
  ] satisfies CaseStudy[],
};

export const FAQS = {
  title: "Questions I get asked",
  items: [
    {
      q: "What does a site cost?",
      a: "It depends on how many pages you need and whether you are selling online. I send you a fixed price by email before we start.",
    },
    {
      q: "How long does it take?",
      a: "A small site is usually two to three weeks. A store with a lot of products, or anything custom, takes longer.",
      link: {
        href: CHOOSE_DEVELOPER_POST,
        label: "How to choose a web developer in Bali",
      },
    },
    {
      q: "Can you work with me if I am not in Bali?",
      a: "Yes. Most of my clients are in Bali, but not all. It runs over email and a shared preview link, so the time difference rarely matters.",
    },
    {
      q: "What happens after launch?",
      a: "You can take it from there, or keep me on for updates, backups, and fixes. Either way I show you how to edit the content.",
    },
    {
      q: "Who owns the code and the site?",
      a: "You do. The domain, the hosting account, the code, and the content are all in your name.",
    },
  ] satisfies Faq[],
};

export const servicesSeo = {
  title: "Web Developer in Bali | Websites and Shopify Stores | Surya Wiguna",
  description:
    "Freelance web developer in Bali. WordPress and Shopify sites for small businesses, plus custom builds. Get a price and a timeline by email.",
  ogImage: AVATAR.src,
};

export const servicesPage = {
  h1: "Web developer in Bali for small businesses and founders",
  intro: [
    "I build websites for small businesses. Most of my clients are in Bali, a few are remote.",
    "Most of the work is WordPress and Shopify, plus the occasional custom build. If you are not sure which you need, email me.",
  ],
  // Used by the parked contact form, see contactCta below.
  contactHeading: "Tell me about your project",
  contactIntro:
    "Fill this in and I will reply with a price and a timeline.",
};

// Soft CTA at the foot of /services. This is a mailto rather than the form in
// components/services/contactForm.tsx: Brevo accepted the test sends but the
// mail never arrived, so the form is parked until delivery is sorted out
// rather than shipped as a lead sink that silently loses enquiries.
export const contactCta = {
  heading: "Tell me about your project",
  body: [
    "Email me what you are building and roughly when you need it live.",
    "I will reply with a price and a timeline.",
  ],
  subject: "Project enquiry",
  label: "Email me",
};

// Rendered under every blog post. The audit for internal linking opportunities
// is handled once here rather than by editing individual posts in Storyblok.
export const blogCta = {
  heading: "Need a site building?",
  body: "I am a freelance web developer in Bali. WordPress sites, Shopify stores, and custom builds.",
  href: "/services",
  label: "See what I do",
};

// Budget bands for the contact form select. Kept vague on purpose: it is a
// qualifying question, not a quote.
export const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 to $3,000",
  "$3,000 to $7,000",
  "$7,000+",
  "Not sure yet",
];
