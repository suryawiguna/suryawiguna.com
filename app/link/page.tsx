import { getPage } from "lib/api";
import { Metadata } from "next";
import { searchComponent } from "lib/helper";
import Introduction from "components/link/introduction";
import Links from "components/link/links";

export const metadata: Metadata = {
  title: "Link",
  description: "Find my social links, latest blog posts, and more here.",
};

export default async function Home() {
  const data = await getPage("link");

  return (
    <div className="flex flex-col items-stretch gap-6">
      <Introduction blok={searchComponent(data, "introduction")} />
      <Links blok={searchComponent(data, "links")} />
    </div>
  );
}
