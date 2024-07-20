import { getPage } from "lib/api";
import { Metadata } from "next";
import { searchComponent } from "lib/helper";
import Introduction from "components/link/introduction";
import Links from "components/link/links";
export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const data = await getPage("link");

  return {
    title: "Links | Surya Wiguna",
    description: "Find my social links, latest blog posts, and more here.",
    alternates: {
      canonical: `/link`,
    },
    openGraph: {
      images: [data.seo.og_image],
      url: "https://suryawiguna.com/link",
      type: "website",
    },
  };
}
export default async function Link() {
  const data = await getPage("link");

  return (
    <div className="flex flex-col items-stretch gap-6">
      <Introduction blok={searchComponent(data, "introduction")} />
      <Links blok={searchComponent(data, "links")} />
    </div>
  );
}
