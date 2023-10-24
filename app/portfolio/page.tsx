import { getPage } from "lib/api";
import { Metadata } from "next";
import { searchComponent } from "lib/helper";
import Portfolios from "components/portfolio/portfolios";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default async function Home() {
  const data = await getPage("portfolio");

  return (
    <div className="flex flex-col items-stretch gap-6">
      <h1 className="font-bold text-3xl">{data.title}</h1>
      <Portfolios blok={searchComponent(data, "portfolios")} />
    </div>
  );
}
