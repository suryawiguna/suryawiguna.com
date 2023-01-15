import Link from "next/link";
import PostCard from "../blog/postCard";

export default function BlogPosts({ blok }) {
  return (
    <div className="mt-8 flex flex-col gap-6">
      <h2 className="text-xl font-bold">Recent Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {blok.posts.map((post) => {
          return <PostCard post={post} />;
        })}
      </div>
      <Link href="/blog" passHref>
        <a
          href=""
          className="flex justify-center text-gray-500 rounded-2xl p-4 bg-gray-100 hover:bg-gray-200 "
        >
          Baca artikel lain
          <i className="bx bx-right-arrow-alt text-2xl" />
        </a>
      </Link>
    </div>
  );
}
