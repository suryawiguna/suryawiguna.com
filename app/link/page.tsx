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
    <>
      <Introduction />
      <Links />
    </>
  );
}
