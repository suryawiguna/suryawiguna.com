import { getPage } from "lib/api";
import { Metadata } from "next";
import { searchComponent } from "lib/helper";
import Introduction from "components/link/introduction";
import Links from "components/link/links";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Link",
};

export default async function Home() {
  const data = await getPage("link");
return <Loading />
  return (
    <div className="flex flex-col items-stretch gap-6">
      <Introduction blok={searchComponent(data, "introduction")} />
      <Links blok={searchComponent(data, "links")} />
    </div>
  );
}
