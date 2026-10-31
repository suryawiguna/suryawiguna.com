import "styles/v3-blog-index.css";

import { getAllPosts } from "lib/posts";
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

export default function Home() {
  const posts = getAllPosts();

  return (
    // .m-page-wide widens <main> to the 1080px canvas, as on the home page.
    <div className="m-page-wide">
      <PostGrid
        posts={posts}
        intro={
          <>
            <h1 className="m-h1">Blog</h1>
            <p className="m-lede">
              Short reads on web development, SEO, B2B funnels, and what
              it&rsquo;s like freelancing from Bali.
            </p>
          </>
        }
      />
    </div>
  );
}
