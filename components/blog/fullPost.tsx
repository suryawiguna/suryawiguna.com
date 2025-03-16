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
        <p className="text-gray-600 text-sm mt-2">
          Posted {moment(post.first_published_at).format("MMMM DD, YYYY")}
        </p>
      </div>
      <div className="w-full h-80 relative">
        <Image
          alt={post.content.featured_image.alt}
          src={post.content.featured_image.filename}
          blurDataURL={`${post.content.featured_image.filename}/m/40x40`}
          placeholder="blur"
          fill
          className="object-cover"
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
