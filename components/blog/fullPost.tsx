"use client";

import moment from "moment";
import { RichText } from "../global";
import Link from "next/link";
import Image from "next/image";

export default function FullPost({ post }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-4xl">{post.name}</h1>
        <p className="text-gray-400 text-sm mt-2">
          Published on {moment(post.first_published_at).format("MMMM DD, YYYY")}
        </p>
      </div>
      <div className="w-full">
        <Image
          alt={post.content.featured_image.alt}
          src={post.content.featured_image.filename}
          loading="lazy"
          width={
            post.content.featured_image.filename.split("/")[5].split("x")[0]
          }
          height={
            post.content.featured_image.filename.split("/")[5].split("x")[1]
          }
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
    </div>
  );
}
