import { RichText } from "../global";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

export default function PostCard({ post, show }) {
  return (
    <Link
      key={post._uid}
      href={post.full_slug}
      passHref
      className={`bg-zinc-100 hover:bg-zinc-200 rounded-lg${
        show ? "" : " hidden"
      }`}
    >
      <div className="rounded-lg flex flex-col sm:flex-row items-stretch">
        <div className="relative min-h-[120px] min-w-[140px] sm:min-h-[140px] sm:min-w-[180px]">
          <Image
            src={post.content.featured_image.filename}
            alt={post.content.featured_image.alt}
            fill
            sizes="auto"
            style={{ objectFit: "cover", objectPosition: "center" }}
            placeholder="blur"
            blurDataURL={`${post.content.featured_image.filename}/m/40x40`}
            className="shrink rounded-t-lg rounded-bl-none sm:rounded-tl-lg sm:rounded-bl-lg sm:rounded-tr-none"
          />
        </div>
        <div className="pt-3 flex-1 p-5">
          <h3 className="text-2xl mb-1">{post.name}</h3>
          <div>
            <RichText
              className="text-sm line-clamp-3 leading-relaxed"
              data={post.content.excerpt}
            />
          </div>
          <p className="published_date text-xs self-end font-light text-zinc-500 mt-2">
            Published {moment(post.first_published_at).format("MMMM DD, YYYY")}
          </p>
        </div>
      </div>
    </Link>
  );
}
