import "styles/v3-blog-index.css";

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
    <>
      <header className="m-hero m-hero-left">
        <p className="m-eyebrow">Blog</p>
        <h1 className="m-h1 m-h1-wide">Work journey</h1>
        <p className="m-lede m-lede-wide">
          Short reads on web development, SEO, B2B funnels, and what it&rsquo;s
          like freelancing from Bali.
        </p>
      </header>
      <PostGrid posts={posts} />
    </>
  );
}
