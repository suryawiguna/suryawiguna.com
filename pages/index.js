import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Index({ data, posts }) {
  const { home } = data;
  const [blogPosts, setPosts] = useState();

  useEffect(() => {
    if (posts) {
      setPosts(posts);
    }
  }, [posts]);

  return (
    <>
      <Head>
        <title>{`${home.title} - Surya Wiguna`}</title>
      </Head>
      <div className="flex flex-col items-start gap-6">
        <h1 className="font-bold text-3xl">{home.title}</h1>
        <Image
          src={home.profile_img}
          alt=""
          width={120}
          height={120}
          placeholder="blur"
          blurDataURL={home.profile_img}
          className="rounded-full"
        />
        <p className="leading-relaxed">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
          <div className="flex flex-col gap-8">
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
                    <div className="rounded-lg flex items-start">
                      <div className="relative min-h-[70px] min-w-[70px] md:min-w-[120px]">
                        <Image
                          src={
                            post._embedded["wp:featuredmedia"]["0"].source_url
                          }
                          layout="fill"
                          objectFit="contain"
                          objectPosition="center"
                          alt=""
                          placeholder="blur"
                          blurDataURL={
                            post._embedded["wp:featuredmedia"]["0"].source_url
                          }
                          className="shrink"
                        />
                      </div>
                      <div className="pt-0 pl-5 flex-1">
                        <h5
                          className="text-gray-900 font-bold mb-1"
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        ></h5>
                        <div>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: post.excerpt.rendered,
                            }}
                            className="text-gray-500 text-sm line-clamp-2 leading-relaxed"
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
    </>
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
