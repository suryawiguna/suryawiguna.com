import { getPage } from "lib/api";
import { Metadata } from "next";
import { searchComponent } from "lib/helper";
import Portfolios from "components/portfolio/portfolios";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Check out my portfolios",
  alternates: {
    canonical: `/portfolio`,
  },
};

export default async function Home() {
  const data = await getPage("portfolio");

  return (
    <div className="flex flex-col items-stretch gap-6">
      <h1 className="text-3xl">{data.title}</h1>
      <Portfolios blok={searchComponent(data, "portfolios")} />
    </div>
  );
}
