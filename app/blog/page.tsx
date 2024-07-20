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
  openGraph: {
    images: ["https://a.storyblok.com/f/169901/877x895/eed121f43d/me.jpeg"],
    url: "https://suryawiguna.com/blog",
    type: "website",
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
