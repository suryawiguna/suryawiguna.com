import { AVATAR } from "content/site";

export type HistoryItem = {
  title: string;
  place: string;
  period: string;
  // Feeds `worksFor` in the home page JSON-LD.
  current?: boolean;
};

export const homeSeo = {
  title: "Freelance Web Developer Bali | Surya Wiguna",
  description:
    "Freelance web developer in Bali. I build fast marketing sites and Shopify storefronts for founders and small teams. Next.js, Shopify, SEO.",
  ogImage: AVATAR.src,
};

export const hero = {
  image: AVATAR,
  // Rendered as `{headline} — {name}` in the <h1>.
  headline: "Freelance Web Developer in Bali",
  name: "Surya Wiguna",
  description:
    "I started in backend, moved through QA, and now spend most days designing and building marketing sites and Shopify storefronts. I work directly with founders and small teams.",
  status: "Available for new projects",
};

export const worksTitle = "Recent Works";

// Name of the portfolio ItemList in the home page JSON-LD.
export const worksListName = "My Portfolio - Web Development Projects";

export const experiences = {
  title: "Working Experiences",
  items: [
    {
      title: "Web Developer",
      place: "igloocompany",
      period: "2021 - now",
      current: true,
    },
    { title: "Software QA", place: "igloocompany", period: "2020 - 2021" },
    { title: "Backend Developer", place: "BTW Edutech", period: "2020 - 2021" },
  ] satisfies HistoryItem[],
};

export const education = {
  title: "Educations",
  items: [
    { title: "Graduated", place: "ITB Stikom Bali", period: "2015 - 2019" },
  ] satisfies HistoryItem[],
};

export const skills = {
  title: "Skills",
  items: [
    "Next.js",
    "Shopify",
    "Figma",
    "Digital Marketing",
    "SEO & AI optimization",
  ],
};
