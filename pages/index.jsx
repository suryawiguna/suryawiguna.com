import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getStoryblokApi } from "@storyblok/react"
import Layout from "../components/layout";
import SbEditable from "storyblok-react";
import * as components from "../components/home";

export default function Index({ data, navigation, posts }) {
  const [blogPosts, setPosts] = useState();
  useEffect(() => {
    if (posts) {
      setPosts(posts);
    }
  }, [posts]);
  let {story} = data;

  return (
    <Layout navigation={navigation}>
      <Head>
        <title>{`${data.story.name} - Surya Wiguna`}</title>
      </Head>
      <div className="flex flex-col items-start gap-6">
        <h1 className="font-bold text-3xl">{story.content.title}</h1>


        {story.content.body.map((blok) => {
          if (typeof components[blok.component] !== "undefined") {
            const Component = components[blok.component];
            return (
              <SbEditable key={blok._uid} content={blok}>
                <Component blok={blok} />
              </SbEditable>
            );
          }
          return (
            <p key={blok._uid}>
              The component <strong>{blok.component}</strong> has not been created
              yet.
            </p>
          );
        })}


        <div className="mt-8 flex flex-col gap-6">
          <h2 className="text-lg font-bold">Recent Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* {home.recent_works.map((work, key) => {
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
            })} */}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-6">
          <h2 className="text-lg font-bold">Recent Blog Posts</h2>
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
                          className="text-gray-900 font-semibold mb-1"
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
    </Layout>
  );
}

export async function getStaticProps() {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/home`, {
    version: "published", 
  });

  let navigation = await storyblokApi.get(`cdn/stories/navigation`, {
    version: "published",
  });

  // const data = require("/data/data.json");
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
      navigation: navigation.data.story.content,
      posts: recentPosts,
    },
  };
}
