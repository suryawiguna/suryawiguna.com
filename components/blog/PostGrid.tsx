"use client";

import PostCard from "./postCard";

export default function PostGrid({ posts }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-7">
        {posts.map((post: any, key: number) => (
          <PostCard key={key} post={post} />
        ))}
      </div>
    </>
  );
}
