import { AVATAR } from "content/site";

export type LinkItem = {
  name: string;
  href: string;
  // Social links render as chips above the full-width buttons.
  social?: boolean;
};

export const linkSeo = {
  title: "Links | Surya Wiguna",
  description: "Find my social links, latest blog posts, and more here.",
  ogImage: AVATAR.src,
};

export const linkIntro = {
  image: AVATAR,
  description: "Explore my other stuff here 😄",
};

export const socialHeading = "Explore my other stuff";

export const LINKS: LinkItem[] = [
  {
    name: "SEO Traffic: How to Increase It",
    href: "/blog/seo-traffic-simple-step-to-increase-it",
  },
  {
    name: "Next.js 14 comes with interesting updates - Blog",
    href: "/blog/next-js-14-comes-with-interesting-updates",
  },
  {
    name: "Utilizing Facade to Enhance Website Performance - Blog",
    href: "/blog/utilizing-facade-to-enhance-website-performance",
  },
  {
    name: "Download Dash (dashboard design) - on Gumroad",
    href: "https://suryawigunaa.gumroad.com/l/dash-minimalist",
  },
  {
    name: "Download BlogX (blog design) - on UI8",
    href: "https://ui8.net/surya-wiguna/products/minimalist-blog-design",
  },
  {
    name: "Visit My Goodreads",
    href: "https://www.goodreads.com/user/show/135018678-surya-wiguna",
  },
  { name: "Let's have a coffee", href: "https://lynk.id/suryawigunaa/s/XAmv6YM" },
  { name: "Email", href: "mailto:hi@suryawiguna.com", social: true },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/suryawigunaa/",
    social: true,
  },
  {
    name: "Behance",
    href: "https://www.behance.net/suryawiguna",
    social: true,
  },
  { name: "Dribbble", href: "https://dribbble.com/suryawigunaa", social: true },
  {
    name: "Tiktok",
    href: "https://www.tiktok.com/@suryawigunaaaa",
    social: true,
  },
];

export const socialLinks = LINKS.filter((link) => link.social);
export const primaryLinks = LINKS.filter((link) => !link.social);
