import { Metadata } from "next";
import Introduction from "components/link/introduction";
import Links from "components/link/links";
import { linkSeo } from "content/links";
import { SITE_URL } from "content/site";

export const metadata: Metadata = {
  title: linkSeo.title,
  description: linkSeo.description,
  alternates: {
    canonical: `/link`,
  },
  openGraph: {
    images: [linkSeo.ogImage],
    url: `${SITE_URL}/link`,
    type: "website",
  },
};

export default function Link() {
  return (
    // .m-page-wide widens <main> to the 1080px canvas, as on the home page.
    <div className="m-page-wide">
      <Introduction />
      <Links />
    </div>
  );
}
