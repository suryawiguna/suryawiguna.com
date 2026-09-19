export const portfolioPage = {
  eyebrow: "Portfolio",
  heading: "Websites built to move a business forward",
  intro:
    "A selection of client websites, Shopify storefronts, and interface concepts—from early structure and design through launch.",
  seo: {
    title: "Web Developer Bali Portfolio | Surya Wiguna",
    description:
      "Explore client websites, Shopify storefronts, and interface concepts designed and built by Surya Wiguna in Bali.",
    ogImage:
      "https://a.storyblok.com/f/169901/1424x900/2c7d9e1381/tropicalkidsbali.jpeg",
  },
};

export type Project = {
  title: string;
  href: string;
  image?: { src: string; alt: string };
  categories: string[];
  description: string;
  kind: "client" | "concept";
  // Also shown in the "Recent Works" section on the home page.
  featured?: boolean;
  // Kept for reference but not rendered anywhere.
  hidden?: boolean;
};

// Order here is the order on /portfolio. The home page shows the `featured`
// ones, in this same order.
export const PROJECTS: Project[] = [
  {
    title: "One Line Solutions",
    href: "https://onelinesolutionsindo.com/",
    image: {
      src: "https://a.storyblok.com/f/169901/1054x668/00f9b1c4e2/one-line-solutions-bali-cargo.webp",
      alt: "One Line Solutions",
    },
    categories: ["Wordpress", "SEO"],
    description:
      "A WordPress site and search-focused service pages for a Bali cargo and shipping company.",
    kind: "client",
    featured: true,
  },
  {
    title: "Vāyu",
    href: "https://getvayu.com/",
    image: {
      src: "https://a.storyblok.com/f/169901/1952x1306/800187fe07/vayu.webp",
      alt: "Vāyu",
    },
    categories: ["Shopify"],
    description:
      "A customised Shopify storefront for an emerging hair-care brand.",
    kind: "client",
    featured: true,
  },
  {
    title: "Kamandhani Dental",
    href: "https://kamandhani.id/",
    image: {
      src: "https://a.storyblok.com/f/169901/1404x752/c251c814a8/kamandhani-dental.png",
      alt: "Kamandhani Dental",
    },
    categories: ["Wordpress", "SEO"],
    description:
      "A conversion-focused website and local search foundation for a dental clinic with branches in Denpasar and Tabanan.",
    kind: "client",
  },
  {
    title: "Stryv - About us",
    href: "https://stryv.co/pages/about-us",
    image: {
      src: "https://a.storyblok.com/f/169901/1722x962/ee54dbf0d1/stryv-about-us-page.webp",
      alt: "Stryv about us page",
    },
    categories: ["Shopify"],
    description:
      "A Shopify About page built in PageFly from an established Figma design system.",
    kind: "client",
  },
  {
    title: "Tropical Entertainment Bali",
    href: "https://tropicalentertainmentbali.com/",
    image: {
      src: "https://a.storyblok.com/f/169901/1426x900/4892aeb281/tropicalentertainmentbali.jpeg",
      alt: "Tropical Entertainment Bali",
    },
    categories: ["Wordpress", "Web design"],
    description:
      "A responsive entertainment-services website designed in Figma and implemented in WordPress with Elementor.",
    kind: "client",
  },
  {
    title: "Tropical Kids Bali",
    href: "https://tropicalentertainmentbali.com/swim",
    image: {
      src: "https://a.storyblok.com/f/169901/1424x900/2c7d9e1381/tropicalkidsbali.jpeg",
      alt: "Tropical Kids Bali",
    },
    categories: ["Wordpress", "Web design"],
    description:
      "A dedicated swimming-class experience designed and built in WordPress for Tropical Entertainment Bali.",
    kind: "client",
  },
  {
    title: "Virtual Tour 360",
    href: "https://virtualtour360puragelap.com/jelajah-virtual",
    image: {
      src: "https://a.storyblok.com/f/169901/2880x1590/9dd6d0482f/virtualtour360puragelap.jpeg",
      alt: "Virtual Tour 360",
    },
    categories: ["Custom website"],
    description:
      "This project came from a friend that asked to create him a virtual tour website which displays the detailed information about one of the temple in Bali.",
    kind: "client",
    hidden: true,
  },
  {
    title: "Geopark Batur",
    href: "https://geopark.netlify.app/",
    image: {
      src: "https://a.storyblok.com/f/169901/1366x768/3e39fc24cf/geopark.jpeg",
      alt: "Geopark Batur",
    },
    categories: ["Custom website"],
    description:
      "An exploratory destination website presenting the landscape and cultural story of Batur Geopark.",
    kind: "concept",
  },
  {
    title: "GasTrip",
    href: "https://gastrip.netlify.app/",
    image: {
      src: "https://a.storyblok.com/f/169901/1348x768/8943edbc8b/gastrip.jpg",
      alt: "GasTrip",
    },
    categories: ["Web design"],
    description:
      "A travel-booking concept exploring destination discovery and package presentation.",
    kind: "concept",
  },
  {
    title: "I Carry Them Everywhere",
    href: "https://www.icarrythemeverywhere.com/gallery/",
    image: {
      src: "https://a.storyblok.com/f/169901/2880x1590/e7422ab31a/icarrythemeverywhere.jpeg",
      alt: "I Carry Them Everywhere",
    },
    categories: ["Custom website", "Web design"],
    description:
      "An editorial gallery created to showcase a fashion designer's work and visual process.",
    kind: "client",
  },
  {
    title: "Geopark - Design",
    href: "https://www.behance.net/gallery/82942741/Batur-Global-Geopark-Website-Concept",
    image: {
      src: "https://a.storyblok.com/f/169901/1920x1502/66bc33b9d1/geopark_cover.jpeg",
      alt: "Geopark website concept",
    },
    categories: ["Web design"],
    description: "This is the detail breakdown of my design work.",
    kind: "concept",
  },
  {
    title: "BlogX",
    href: "https://www.behance.net/gallery/119993475/BlogX-Minimalist-Blog-Design",
    image: {
      src: "https://a.storyblok.com/f/169901/1800x1360/1e45556bda/blogx.jpeg",
      alt: "BlogX minimalist blog design",
    },
    categories: ["Web design"],
    description:
      "A minimalist publishing concept focused on comfortable long-form reading.",
    kind: "concept",
  },
  {
    title: "Fruito",
    href: "https://www.behance.net/gallery/83639655/Fruito-Web",
    image: {
      src: "https://a.storyblok.com/f/169901/5000x3986/e60ea598be/cover.jpeg",
      alt: "Fruito web design",
    },
    categories: ["Web design"],
    description:
      "A playful ecommerce concept for a fresh-produce brand.",
    kind: "concept",
  },
  {
    title: "Gear",
    href: "https://www.behance.net/gallery/111585541/Landing-Page-concept-for-Gear-by-BWA",
    image: {
      src: "https://a.storyblok.com/f/169901/1280x1000/973bcd21c1/cover_gear.jpeg",
      alt: "Gear landing page concept",
    },
    categories: ["Web design"],
    description:
      "A resource-discovery landing page for productivity tools and workflows.",
    kind: "concept",
  },
  {
    title: "Holiplace",
    href: "https://www.behance.net/gallery/107067625/Holiplace-Web-Design",
    image: {
      src: "https://a.storyblok.com/f/169901/1280x1000/4f32549351/holiplace.jpeg",
      alt: "Holiplace web design",
    },
    categories: ["Web design"],
    description:
      "A travel-accommodation concept built around finding and booking memorable stays.",
    kind: "concept",
  },
  {
    title: "GasTrip - Design",
    href: "https://www.behance.net/gallery/102575355/GasTrip-Web-Design",
    image: {
      src: "https://a.storyblok.com/f/169901/1280x1002/28443b7d6a/gastrip.jpeg",
      alt: "GasTrip web design",
    },
    categories: ["Web design"],
    description: "This is the detailed breakdown about GasTrip web design.",
    kind: "concept",
  },
  {
    title: "Saksi Management System",
    href: "https://gitlab.com/suryawigunaa/saksi",
    image: {
      src: "https://a.storyblok.com/f/169901/1366x768/c62b013bc6/saksi.jpeg",
      alt: "Saksi management system",
    },
    categories: ["Custom website"],
    description:
      "A custom management system to record data of witnesses for an election.",
    kind: "client",
    hidden: true,
  },
];

export const visibleProjects = PROJECTS.filter((project) => !project.hidden);

export const clientProjects = visibleProjects.filter(
  (project) => project.kind === "client"
);

export const conceptProjects = visibleProjects.filter(
  (project) => project.kind === "concept"
);

export const featuredProjects = visibleProjects.filter(
  (project) => project.featured
);
