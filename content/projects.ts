export const portfolioPage = {
  heading: "Portfolio",
  seo: {
    title: "Web Developer Bali Portfolio | Surya Wiguna",
    description: "Check out my portfolios",
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
      "One Line Solutions is a Bali cargo and shipping company covering air and sea freight, door-to-door export-import, and domestic logistics. Built their WordPress site and optimized the service pages for search.",
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
      "Vāyu is a new hair-care brand that aims to solve fundamental problems with current products in the market. Set up their initial Shopify store with a customized design.",
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
      "Kamandhani Dental is a dental clinic have 2 branches in Denpasar and Tabanan. They want to make website and gain more traffic through Google with Ads and organic by optimizing SEO.",
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
      "On this project, I was asked to applied the design that were created on Figma to their Shopify store using Pagefly page builder.",
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
      "In this project, I worked on the web design that was done using Figma and then implement it using Wordpress with the help of Elementor.",
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
      "This project is related to a swimming class which still under Tropical Entertainment Bali, in this project I've also done the web design and implement it using Wordpress.",
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
      "This one is also a custom website for displaying information about one of a tourist destination in Bali.",
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
      "This project is more like my personal exercise on web design. The idea is to build a travel agency and displaying the travel packages.",
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
      "One of my colleauge asked me to create a website for her to display her works in fashion design, basically to become a gallery.",
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
      "I created simple blog design, the idea was to give the reader more comfort to read on the post. If you like it, you can purchase it on Lynk.",
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
      "Some web design inspiration that came to mind, this one is about a fruit store.",
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
      "This web design is about a website to find resources about the tools that may help your productivity.",
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
      "The idea of this design is to make a website to booking your stay when traveling around the world.",
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
    hidden: true,
  },
];

export const visibleProjects = PROJECTS.filter((project) => !project.hidden);

export const featuredProjects = visibleProjects.filter(
  (project) => project.featured
);
