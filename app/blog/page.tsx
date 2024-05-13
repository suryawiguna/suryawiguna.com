import { getAllPosts } from "lib/api";
import { Metadata } from "next";
import PostGrid from "components/blog/PostGrid";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my blog, where I write my thought.",
  alternates: {
    canonical: `/blog`,
  },
};

export default async function Home() {
  const posts = (await getAllPosts()) || [];

  return (
    <div className="flex flex-col items-stretch gap-6">
      <h1 className="font-bold text-3xl">Blog</h1>
      <PostGrid posts={posts} />
    </div>
  );
}
