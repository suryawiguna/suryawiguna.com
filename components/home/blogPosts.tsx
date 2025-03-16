import Link from "next/link";
import PostCard from "../blog/postCard";

export default function BlogPosts({ blok }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl">Recent Blog Posts</h2>
      <div className="grid grid-cols-1 gap-6">
        {blok.posts.map((post, key) => {
          return <PostCard key={key} post={post} show={true} />;
        })}
      </div>
      <Link
        href="/blog"
        passHref
        className="flex flex-1 justify-center text-gray-500 hover:underline underline-offset-8"
      >
        <span>Other blog posts</span>
      </Link>
    </div>
  );
}
