"use client";

import { RichText } from "../global";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

export default function PostCard({ post }) {
  return (
    <Link
      key={post._uid}
      href={post.full_slug}
      passHref
      className="bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-300 hover:scale-[0.98] transition-transform rounded-2xl"
    >
      <div className="rounded-lg flex xl:flex-col items-stretch">
        <div className="relative min-h-[120px] min-w-[140px] sm:min-h-[140px] sm:min-w-[180px]">
          <Image
            src={post.content.featured_image.filename}
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            placeholder="blur"
            blurDataURL={`${post.content.featured_image.filename}/m/40x40`}
            className="shrink rounded-tl-2xl rounded-bl-2xl xl:rounded-t-2xl xl:rounded-bl-none"
          />
        </div>
        <div className="pt-3 flex-1 p-5">
          <h5 className="text-xl font-semibold mb-1">{post.name}</h5>
          <div>
            <RichText
              className="text-sm line-clamp-3 leading-relaxed"
              data={post.content.excerpt}
            />
          </div>
          <small className="text-xs self-end font-light text-zinc-400">
            {moment(post.first_published_at).format("MMMM DD, YYYY")}
          </small>
        </div>
      </div>
    </Link>
  );
}
