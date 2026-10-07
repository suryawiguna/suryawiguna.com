import { AVATAR } from "content/site";

export type LinkGroup = "profiles" | "writing" | "downloads" | "elsewhere";

export type LinkItem = {
  name: string;
  href: string;
  // Profiles render as chips at the top of /link (and in the footer); the
  // other groups are labelled lists under "Links".
  group: LinkGroup;
  // Where an outbound link lands, shown muted after the name.
  note?: string;
};

export const linkSeo = {
  title: "Links | Surya Wiguna",
  description: "Find my social links, latest blog posts, and more here.",
  ogImage: AVATAR.src,
};

export const linkIntro = {
  image: AVATAR,
  name: "Surya Wiguna",
  description:
    "Web developer in Bali. Posts, downloads, and where else to find me.",
};

export const socialHeading = "Profiles";
export const primaryHeading = "Links";

// Order here is the order on /link.
const GROUP_LABELS: Record<Exclude<LinkGroup, "profiles">, string> = {
  writing: "Writing",
  downloads: "Downloads",
  elsewhere: "Elsewhere",
};

export const LINKS: LinkItem[] = [
  {
    name: "SEO Traffic: How to Increase It",
    href: "/blog/seo-traffic-simple-step-to-increase-it",
    group: "writing",
  },
  {
    name: "Next.js 14 comes with interesting updates",
    href: "/blog/next-js-14-comes-with-interesting-updates",
    group: "writing",
  },
  {
    name: "Utilizing Facade to Enhance Website Performance",
    href: "/blog/utilizing-facade-to-enhance-website-performance",
    group: "writing",
  },
  {
    name: "Dash, a minimalist dashboard design",
    href: "https://suryawigunaa.gumroad.com/l/dash-minimalist",
    group: "downloads",
    note: "Gumroad",
  },
  {
    name: "BlogX, a minimalist blog design",
    href: "https://ui8.net/surya-wiguna/products/minimalist-blog-design",
    group: "downloads",
    note: "UI8",
  },
  {
    name: "What I'm reading",
    href: "https://www.goodreads.com/user/show/135018678-surya-wiguna",
    group: "elsewhere",
    note: "Goodreads",
  },
  {
    name: "Let's have a coffee",
    href: "https://lynk.id/suryawigunaa/s/XAmv6YM",
    group: "elsewhere",
    note: "Lynk",
  },
  { name: "Email", href: "mailto:hi@suryawiguna.com", group: "profiles" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/suryawigunaa/",
    group: "profiles",
  },
  {
    name: "Behance",
    href: "https://www.behance.net/suryawiguna",
    group: "profiles",
  },
  {
    name: "Dribbble",
    href: "https://dribbble.com/suryawigunaa",
    group: "profiles",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@suryawigunaaaa",
    group: "profiles",
  },
];

export const socialLinks = LINKS.filter((link) => link.group === "profiles");

// Empty groups are dropped, so removing every download hides its label too.
export const linkGroups = (
  Object.keys(GROUP_LABELS) as (keyof typeof GROUP_LABELS)[]
)
  .map((id) => ({
    id,
    label: GROUP_LABELS[id],
    links: LINKS.filter((link) => link.group === id),
  }))
  .filter((group) => group.links.length > 0);
