import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout";

export default function Index({ data, posts }) {
  const { home } = data;
  const [blogPosts, setPosts] = useState();

  useEffect(() => {
    if (posts) {
      setPosts(posts);
    }
  });

  return (
    <Layout title={home.title}>
      <div className="flex flex-col items-start gap-6">
        <h1 className="font-bold text-3xl">{home.title}</h1>
        <Image
          src={home.profile_img}
          alt=""
          width={120}
          height={120}
          className="rounded-full"
        />
        <p className="text-lg leading-relaxed">
          I&apos;m designing and developing website to help people. Kindly reach
          me on{" "}
          <a href="mailto:hi@suryawiguna.com" className="underline font-bold">
            Email
          </a>{" "}
          or{" "}
          <a
            href="https://www.linkedin.com/in/suryawigunaa"
            className="underline font-bold"
          >
            LinkedIn
          </a>
        </p>
        <div className="mt-12 flex flex-col gap-6">
          <h2 className="text-lg font-semibold">Recent Works</h2>
          <div className="flex gap-5">
            {home.recent_works.map((work, key) => {
              return (
                <a
                  key={key}
                  href={work.link}
                  className="scale-100 hover:scale-105 drop-shadow-md"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={work.img}
                    width={284}
                    height={180}
                    alt=""
                    placeholder="blur"
                    blurDataURL={work.img}
                    className="rounded-lg"
                  />
                </a>
              );
            })}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-6">
          <h2 className="text-lg font-semibold">Recent Blog Posts</h2>
          <div className="flex flex-col gap-6">
            {blogPosts &&
              blogPosts.map((post, key) => {
                return (
                  <a
                    href={post.link}
                    key={key}
                    target="_blank"
                    rel="noreferrer"
                    className="scale-100 hover:scale-105"
                  >
                    <div className="rounded-lg flex flex-col sm:flex-row items-start">
                      <Image
                        src={post._embedded["wp:featuredmedia"]["0"].source_url}
                        width={180}
                        height={120}
                        alt=""
                        className="grow"
                      />
                      <div className="pt-5 md:pt-0 md:pl-5 flex-1">
                        <h5
                          className="text-gray-900 font-bold text-xl tracking-tight mb-2"
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        ></h5>
                        <div>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: post.excerpt.rendered,
                            }}
                            className="text-gray-500 line-clamp-2"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = require("/data/data.json");
  const res = await fetch(
    "https://blog.suryawiguna.com/wp-json/wp/v2/posts?_embed"
  );
  const posts = await res.json();
  const keys_to_keep = ["link", "title", "excerpt", "_embedded"];

  // only keep certain keys that necessary
  const redux = (array) =>
    array.map((o) =>
      keys_to_keep.reduce((acc, curr) => {
        acc[curr] = o[curr];
        return acc;
      }, {})
    );
  const recentPosts = redux(posts.splice(0, 3));

  return {
    props: {
      data: data,
      posts: recentPosts,
    },
  };
}
