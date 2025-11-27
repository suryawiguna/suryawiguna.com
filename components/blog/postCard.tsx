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
      className={`${show ? "" : " hidden"}`}
    >
      <div className="flex flex-col sm:flex-row items-stretch gap-4">
        <div className="relative min-h-[180px] min-w-[140px] sm:min-h-[140px] sm:min-w-[240px]">
          <Image
            src={post.content.featured_image.filename}
            alt={post.content.featured_image.alt}
            fill
            sizes="auto"
            style={{ objectFit: "cover", objectPosition: "center" }}
            loading="eager"
          />
        </div>
        <div>
          <h3 className="text-2xl mb-1">{post.name}</h3>
          <div>
            <RichText
              className="text line-clamp-3 leading-relaxed text-gray-500"
              data={post.content.excerpt}
            />
          </div>
          <p className="published_date text-xs self-end font-light text-zinc-500 mt-2 tracking-wide">
            Published on{" "}
            {moment(post.first_published_at).format("MMMM DD, YYYY")}
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
      </div>
    </Link>
  );
}
