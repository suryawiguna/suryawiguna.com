import Image from "next/image";
import Link from "next/link";
import { RichText } from "../global";

export default function BlogPosts({ blok }) {
  return (
    <div className="mt-8 flex flex-col gap-6">
      <h2 className="text-xl font-bold">Recent Blog Posts</h2>
      <div className="flex flex-col max-w-2xl gap-4">
        {blok.posts.map((post) => {
          return (
            <Link key={post._uid} href={post.full_slug} passHref>
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-5"
              >
                <div className="rounded-lg flex flex-col sm:flex-row items-stretch">
                  <div className="relative min-h-[120px] min-w-[140px] sm:min-h-[140px] sm:min-w-[180px]">
                    <Image
                      src={`https:${post.content.featured_image.filename}`}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      placeholder="blur"
                      blurDataURL={`https:${post.content.featured_image.filename}`}
                      className="shrink rounded-lg"
                    />
                  </div>
                  <div className="pt-3 sm:pt-0 sm:pl-6 flex-1">
                    <h5 className="text-gray-900 text-xl font-semibold mb-1">
                      {post.name}
                    </h5>
                    <div>
                      <RichText
                        className="text-gray-600 text-sm line-clamp-3 leading-relaxed"
                        data={post.content.excerpt}
                      />
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
        <Link href="/blog" passHref>
          <a
            href=""
            className="flex justify-center text-gray-500 rounded-lg p-4 bg-gray-100 hover:bg-gray-200 "
          >
            Baca artikel lain
            <i className="bx bx-right-arrow-alt text-2xl" />
          </a>
        </Link>
      </div>
    </div>
  );
}
