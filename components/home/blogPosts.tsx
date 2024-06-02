import Link from "next/link";
import PostCard from "../blog/postCard";

export default function BlogPosts({ blok }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">Recent Blog Posts</h2>
      <div className="grid grid-cols-1 gap-6">
        {blok.posts.map((post, key) => {
          return <PostCard key={key} post={post} />;
        })}
      </div>
      <Link
        href="/blog"
        passHref
        className="flex justify-center items-center text-gray-500 rounded-lg p-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 hover:scale-[0.99] transition-transform dark:text-zinc-300"
      >
        <span>Go to blog</span>
        <i className="bx bx-right-arrow-alt text-2xl" />
      </Link>
    </div>
  );
}
