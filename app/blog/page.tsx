import { getAllPosts } from "lib/api";
import { Metadata } from "next";
import PostGrid from "components/blog/PostGrid";

export const metadata: Metadata = {
  title: "Web Developer Bali Blog | Surya Wiguna",
  description:
    "Read articles about my web developer experiences and journey here.",
  alternates: {
    canonical: `/blog`,
  },
};

export default async function Home() {
  const posts = (await getAllPosts()) || [];

  return (
    <div className="flex flex-col items-stretch gap-6">
      <h1 className="text-3xl">Blog</h1>
      <PostGrid posts={posts} />
    </div>
  );
}
