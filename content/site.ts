// Site-wide facts. Everything outside /blog is hardcoded under content/ —
// only blog posts still come from Storyblok. Images keep pointing at the
// Storyblok CDN (a.storyblok.com), which stays an allowed next/image host.

export const SITE_URL = "https://suryawiguna.com";
export const SITE_NAME = "Surya Wiguna";
export const EMAIL = "hi@suryawiguna.com";

export const LOCATION = {
  locality: "Bali",
  country: "ID",
};

export const AVATAR = {
  src: "https://a.storyblok.com/f/169901/877x895/eed121f43d/me.jpeg",
  alt: "Surya Wiguna",
};

export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/in/suryawigunaa/",
  "https://www.behance.net/suryawiguna",
  "https://dribbble.com/suryawigunaa",
  "https://www.instagram.com/suryawigunaa/",
  "https://www.tiktok.com/@suryawigunaaaa",
  "https://www.goodreads.com/user/show/135018678-surya-wiguna",
];

// Describes the one-person business behind the site (the ProfessionalService
// node in the home page JSON-LD), as opposed to homeSeo.description, which is
// the page's meta description.
export const BUSINESS_DESCRIPTION =
  "Freelance web development and design based in Bali, building fast marketing sites and Shopify storefronts for founders and small teams, with SEO and AI search optimization built in.";

// What is on offer now lives in content/services.ts as OFFERS, which feeds
// both the sales copy and the OfferCatalog in lib/jsonLd.ts. Keeping a second
// list here meant the schema and the pages described different businesses.

export const NAV_ITEMS = [
  { href: "/", label: "home" },
  { href: "/services", label: "services" },
  { href: "/portfolio", label: "portfolio" },
  { href: "/blog", label: "blog" },
  { href: "/link", label: "link" },
];

// Storyblok used to supply `published_at` for these routes' sitemap entries.
// With the content in code there is nothing to read a date from, so bump the
// matching entry whenever you meaningfully edit a page.
export const PAGE_UPDATED = {
  home: "2026-08-10",
  services: "2026-08-09",
  portfolio: "2026-08-10",
  link: "2026-08-09",
};
