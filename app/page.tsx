import { getHome } from "lib/api";
import Introduction from "components/home/introduction";
import Portfolios from "components/portfolio/portfolios";
import SubscribeForm from "components/blog/subscribe";
import BlogPosts from "components/home/blogPosts";
import { Metadata } from "next";
import { searchComponent } from "lib/helper";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const data = await getHome();

  return (
    <div className="flex flex-col items-stretch gap-8">
      <h1 className="font-bold text-3xl">{data.title}</h1>
      <div className="flex flex-col gap-12">
        <Introduction blok={searchComponent(data, "introduction")} />
        <Portfolios blok={searchComponent(data, "portfolios")} />
        <BlogPosts blok={searchComponent(data, "blogPosts")} />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-6">Subscribe to my blog</h2>
          <SubscribeForm />
        </div>
      </div>
    </div>
  );
}
