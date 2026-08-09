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
  // Shown as-is. TODO: confirm pricing. The post
  // /blog/how-to-choose-web-developer-bali already publishes IDR ranges, so
  // whatever lands here should agree with it.
  priceFrom: string;
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
      "A site that explains what you sell and gets people to enquire. Built in Next.js when you want it fast, WordPress when you want to edit it yourself. Usually four to six pages.",
    detail: [
      "This is the one most people come for. You have a business, you need a site that loads fast, reads well on a phone, and turns a visitor into an enquiry.",
      "I write the structure with you, design it, then build it. Next.js if speed and search matter most, WordPress if you would rather log in and change the copy yourself without calling me. Either way you get the pages, the forms, and the basic SEO setup done properly the first time.",
    ],
    priceFrom: "from $X",
  },
  {
    slug: "shopify",
    title: "Shopify storefront",
    cardBlurb:
      "A new store, or a theme customised until it actually looks like your brand. Products, payments, and shipping set up so you can start selling.",
    detail: [
      "If you sell physical products, Shopify handles the boring parts: payments, stock, shipping, taxes. What it does not do is make your store look like anyone in particular.",
      "I set up the store and customise the theme so it matches your brand, not the demo. That covers product pages, collections, cart, and checkout styling. If you already have a store and it just looks generic, I can work on the existing theme instead of starting over.",
    ],
    priceFrom: "from $X",
  },
  {
    slug: "migration",
    title: "Rebuild or migration",
    cardBlurb:
      "You already have a site and it is slow, dated, or a pain to update. WordPress to Next.js, or a Shopify theme to headless, without losing your search rankings.",
    detail: [
      "Old sites get slow and awkward. Plugins pile up, the theme stops being supported, and every small change turns into a job.",
      "I move the content across, keep the URLs and redirects intact so you do not lose the traffic you already earn, and rebuild the front end on something current. The usual routes are WordPress to Next.js and a stock Shopify theme to a headless setup, but the principle is the same: same content, faster site, easier to change.",
    ],
    priceFrom: "from $X",
  },
] satisfies Offer[];

export const PROCESS = {
  title: "How it works",
  timeline:
    "Most sites go live in under two weeks from the first call. Bigger builds take longer, and I will tell you that before you pay anything.",
  steps: [
    {
      title: "Call",
      line: "Thirty minutes. You tell me what you sell and who buys it, I tell you what it costs and how long it takes.",
    },
    {
      title: "Design",
      line: "I send you the layout before any code exists. You change what you want while changing it is cheap.",
    },
    {
      title: "Build",
      line: "I build it and you watch it happen on a preview link, not in a status email.",
    },
    {
      title: "Launch",
      line: "It goes live, you own it, and I show you how to edit the parts you will want to edit.",
    },
  ] satisfies Step[],
};

// The Bali half of the audience. These three sectors stay open to foreign
// investment after the 2026 PT PMA restrictions, so they are where the local
// budget actually is.
export const SECTORS = {
  title: "Who I work with",
  intro:
    "Half my work is for businesses here on the island, half is remote. If you are local, these are the sectors I know best.",
  items: [
    {
      name: "Villas and accommodation",
      blurb:
        "Direct bookings instead of paying a platform for every guest. Fast photo-heavy pages, clear rates, an enquiry form that actually reaches you.",
    },
    {
      name: "Cafes and restaurants",
      blurb:
        "Menu, location, hours, and reservations, on a page that opens quickly on a tourist's phone with bad signal. Plus the Google setup so you turn up when someone searches nearby.",
    },
    {
      name: "Wellness and yoga studios",
      blurb:
        "Schedules, teacher profiles, retreat pages, and class bookings. Built so you can update next month's timetable without asking anyone for help.",
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
        "Each service now has a page that can rank and be sent to a client on its own, and the team can add or edit services without a developer.",
    },
    {
      projectTitle: "Vāyu",
      problem:
        "A new hair care brand launching into a crowded market, with no store and a brand identity that a stock Shopify theme would have flattened.",
      built:
        "Their first Shopify store, with the theme customised around the brand: product pages that explain the problem each product solves, and a checkout flow kept short.",
      result:
        "They launched with a store that looks like their brand rather than a template, and can add products themselves as the range grows.",
    },
  ] satisfies CaseStudy[],
};

export const FAQS = {
  title: "Questions I get asked",
  items: [
    {
      q: "What does a site cost?",
      a: "It depends on how many pages you need and whether you are selling online. I give you a fixed number after the first call, before you commit to anything, so you are never billed for a surprise.",
    },
    {
      q: "How long does it take?",
      a: "Most sites go live in under two weeks from the first call. A store with a lot of products, or a build that needs custom functionality, takes longer. I will say so upfront rather than promise two days and disappear.",
      link: {
        href: CHOOSE_DEVELOPER_POST,
        label: "More on spotting unrealistic timelines",
      },
    },
    {
      q: "Can you work with me if I am not in Bali?",
      a: "Yes. About half my clients are elsewhere. We do a call to start, then most of it runs over email and a shared preview link, so the time difference rarely matters.",
    },
    {
      q: "What happens after launch?",
      a: "You can take it from there, or keep me on for updates, backups, and fixes. I will show you how to edit the content either way. There is no lock-in and no monthly fee you did not agree to.",
    },
    {
      q: "Who owns the code and the site?",
      a: "You do. The domain, the hosting account, the code, and the content are all in your name. If you want to move to another developer later you can, and nothing is held hostage.",
    },
  ] satisfies Faq[],
};

export const servicesSeo = {
  title: "Web Developer in Bali | Websites and Shopify Stores | Surya Wiguna",
  description:
    "Freelance web developer in Bali. Marketing sites, Shopify storefronts, and rebuilds for villas, cafes, wellness studios, and remote founders. Most sites live in under two weeks.",
  ogImage: AVATAR.src,
};

export const servicesPage = {
  h1: "Web developer in Bali for small businesses and founders",
  intro: [
    "I build websites for small businesses: villas, cafes, studios, and product brands here in Bali, plus founders and small teams working remotely.",
    "You do not need to know what Next.js is. You need a site that loads fast, says the right thing, and brings you enquiries. That is the part I handle.",
  ],
  // Soft CTA at the foot of the page, above the form.
  contactHeading: "Tell me about your project",
  contactIntro:
    "Fill this in and I will come back to you with a price and a timeline. No obligation, and I will tell you if I am not the right fit.",
};

// Rendered under every blog post. The audit for internal linking opportunities
// is handled once here rather than by editing individual posts in Storyblok.
export const blogCta = {
  heading: "Need a site building?",
  body: "I am a freelance web developer in Bali. Marketing sites, Shopify stores, and rebuilds, usually live in under two weeks.",
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
