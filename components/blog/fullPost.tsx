"use client";

import moment from "moment";
import { RichText } from "../global";
import Link from "next/link";
import Image from "next/image";
import { DiscussionEmbed } from "disqus-react";

export default function FullPost({ post }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-4xl">{post.name}</h1>
        <p className="text-gray-500 text-sm mt-2">
          Published on {moment(post.first_published_at).format("MMMM DD, YYYY")}
        </p>
        {post.tag_list.length > 0 && (
          <div className="mt-2 max-w-screen">
            {post.tag_list.map((tag: string, index: number) => {
              return (
                <div
                  key={index}
                  className="inline-block text-xs bg-gray-200 text-gray-400 px-2 py-1 rounded"
                  style={{ margin: "2px" }}
                >
                  {tag}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="w-auto h-max relative">
        <Image
          alt={post.content.featured_image.alt}
          src={post.content.featured_image.filename}
          loading="lazy"
          width={600}
          height={600}
        />
      </div>
      <RichText data={post.content.content} className="text-lg" />
      <Link
        href="/blog"
        passHref
        className="flex gap-1 items-center underline underline-offset-4 my-8 rounded-lg hover:text-zinc-400 self-start"
      >
        Read other posts
      </Link>
      <div>
        <DiscussionEmbed
          shortname="surya-wiguna"
          config={{
            url: "https://suryawiguna.com/blog/" + post.slug,
            identifier: post.content._uid,
            title: post.name,
            language: "",
          }}
        />
      </div>
    </div>
  );
}
