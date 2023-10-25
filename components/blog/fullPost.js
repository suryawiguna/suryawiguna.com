"use client";

import moment from "moment";
import { RichText } from "../global";
import Link from "next/link";
import Image from "next/image";

export default function FullPost({ post }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-bold text-3xl">{post.name}</h1>
        <small className="text-gray-500">
          {moment(post.first_published_at).format("MMMM DD, YYYY")}
        </small>
      </div>
      <div className="w-full h-80 relative">
        <Image
          alt=""
          src={post.content.featured_image.filename}
          blurDataURL={`${post.content.featured_image.filename}/m/40x40`}
          placeholder="blur"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <RichText data={post.content.content} />
      <Link
        href="/blog"
        passHref
        className="flex gap-1 items-center my-8 rounded-full hover:text-zinc-400 self-start"
      >
        <i className="bx bx-left-arrow-alt text-2xl" />
        Other posts
      </Link>
    </div>
  );
}
