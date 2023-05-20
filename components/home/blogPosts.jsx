import Link from "next/link";
import PostCard from "../blog/postCard";

export default function BlogPosts({ blok }) {
  return (
    <div className="mt-8 flex flex-col gap-6">
      <h2 className="text-xl font-bold">Recent Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {blok.posts.map((post, key) => {
          return <PostCard key={key} post={post} />;
        })}
      </div>
      <Link href="/blog" passHref>
        <a
          href=""
          className="flex justify-center text-gray-500 rounded-2xl p-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          Go to blog
          <i className="bx bx-right-arrow-alt text-2xl" />
        </a>
      </Link>
    </div>
  );
}
