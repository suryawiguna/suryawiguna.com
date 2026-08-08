import { getHome } from "lib/api";
import Introduction from "components/home/introduction";
import Histories from "components/experience/histories";
import Skills from "components/skill/skill";
import JsonLd from "components/jsonLd";
import { searchComponent } from "lib/helper";
import dynamic from "next/dynamic";

const BlogPosts = dynamic(() => import("../components/home/blogPosts"), {
  ssr: false,
});
const Portfolios = dynamic(() => import("../components/portfolio/portfolios"));

import type { Metadata } from "next";

const SITE_URL = "https://suryawiguna.com";
const PERSON_ID = `${SITE_URL}/#person`;

const SERVICES = [
  "Next.js Web Development",
  "Shopify Store Development",
  "WordPress Development",
  "SEO & AI Search Optimization",
  "UI/UX Design",
];

const SAME_AS = [
  "https://www.linkedin.com/in/suryawigunaa/",
  "https://www.behance.net/suryawiguna",
  "https://dribbble.com/suryawigunaa",
  "https://www.tiktok.com/@suryawigunaaaa",
  "https://www.goodreads.com/user/show/135018678-surya-wiguna",
];

function generateHomeJsonLd(data: any) {
  const skills = searchComponent(data, "skills");
  const portfolios = searchComponent(data, "portfolios");
  const image = searchComponent(data, "introduction")?.image?.filename;
  const experience = data.body.find(
    (blok: any) => blok.component == "histories" && blok.title == "Working Experiences"
  );
  const education = data.body.find(
    (blok: any) => blok.component == "histories" && blok.title == "Educations"
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Surya Wiguna",
        url: SITE_URL,
        image,
        jobTitle: "Freelance Web Developer",
        description: data.seo.description,
        email: "mailto:hi@suryawiguna.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bali",
          addressCountry: "ID",
        },
        knowsAbout: skills?.skills.map((skill: any) => skill.name),
        alumniOf: education?.histories.map((item: any) => ({
          "@type": "CollegeOrUniversity",
          name: item.place,
        })),
        worksFor: experience?.histories
          .filter((item: any) => !item.hide && item.periode?.includes("now"))
          .map((item: any) => ({ "@type": "Organization", name: item.place })),
        sameAs: SAME_AS,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Surya Wiguna",
        alternateName: "Freelance Web Developer Bali",
        publisher: { "@id": PERSON_ID },
        inLanguage: "en",
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: data.seo.title,
        description: data.seo.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: "Surya Wiguna — Freelance Web Developer Bali",
        url: SITE_URL,
        image,
        founder: { "@id": PERSON_ID },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bali",
          addressCountry: "ID",
        },
        areaServed: [
          { "@type": "Place", name: "Bali" },
          { "@type": "Country", name: "Indonesia" },
          { "@type": "Place", name: "Worldwide" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web Development Services",
          itemListElement: SERVICES.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#works`,
        name: portfolios?.title,
        itemListElement: portfolios?.items
          .filter((item: any) => !item.hide)
          .map((item: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: item.title,
              url: item.link.url || item.link.cached_url,
              image: item.image?.filename,
              keywords: item.category?.join(", "),
              creator: { "@id": PERSON_ID },
            },
          })),
      },
    ],
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHome();

  return {
    title: data.seo.title,
    description: data.seo.description,
    alternates: {
      canonical: `/`,
    },
    openGraph: {
      images: [data.seo.og_image],
      url: "https://suryawiguna.com/",
      type: "website",
    },
  };
}

export default async function Home() {
  const data = await getHome();
  const histories = data.body.filter(
    (blok: any) => blok.component == "histories"
  );

  return (
    <>
      <Introduction blok={searchComponent(data, "introduction")} />
      <Portfolios blok={searchComponent(data, "portfolios")} />
      <section id="about" className="m-section">
        <div className="m-cols">
          {histories.map((blok: any, key: number) => (
            <Histories key={key} blok={blok} />
          ))}
        </div>
        <Skills blok={searchComponent(data, "skills")} />
      </section>
      <BlogPosts blok={searchComponent(data, "blogPosts")} />
      <JsonLd data={generateHomeJsonLd(data)} />
    </>
  );
}
