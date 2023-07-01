import moment from "moment";
import { RichText } from "../global";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function FullPost({ post }) {
  useEffect(() => {
    var ads = document.getElementsByClassName("adsbygoogle").length;
    for (var i = 0; i < ads; i++) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-start gap-6">
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
          placeholder="blur"
          blurDataURL={`${post.content.featured_image.filename}/m/40x40`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <RichText data={post.content.content} />
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8562944824984533"
        data-ad-slot="5983640257"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <Link href="/blog" passHref>
        <a
          href=""
          className="p-4 px-6 flex gap-1 align-middle mt-8 text-sm rounded-full bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-700  "
        >
          <i className="bx bx-left-arrow-alt text-xl" />
          Other posts
        </a>
      </Link>
    </div>
  );
}
