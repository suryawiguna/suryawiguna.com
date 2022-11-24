import Image from "next/image";
import Link from "next/link";
import { RichText } from "../global";
import moment from "moment";

export default function BlogPosts({ blok }) {
  return (
    <div className="mt-8 flex flex-col gap-6">
      <h2 className="text-xl font-bold">Recent Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {blok.posts.map((post) => {
          return (
            <Link key={post._uid} href={post.full_slug} passHref>
              <a
                href=""
                className="bg-gray-100 hover:bg-gray-200 rounded-2xl p-5"
              >
                <div className="rounded-lg flex flex-col items-stretch">
                  <div className="relative min-h-[120px] min-w-[140px] sm:min-h-[140px] sm:min-w-[180px]">
                    <Image
                      src={post.content.featured_image.filename}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      placeholder="blur"
                      blurDataURL={`${post.content.featured_image.filename}/m/40x40`}
                      className="shrink rounded-lg"
                    />
                  </div>
                  <div className="pt-3 flex-1">
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
                  <small className="text-gray-400 mt-5 text-xs self-end">
                    {moment(post.first_published_at).format("MMMM DD, YYYY")}
                  </small>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
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
  );
}
