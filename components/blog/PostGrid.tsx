"use client";

import { useState } from "react";
import PostCard from "./postCard";

export default function PostGrid({ posts }) {
  const [postToShow, setPostToShow] = useState(8);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post: any, key: number) => {
          if (key + 1 <= postToShow) {
            return <PostCard key={key} post={post} />;
          }
        })}
      </div>
      {postToShow < posts.length && (
        <button
          className="flex flex-1 justify-center text-gray-500 rounded-2xl p-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 hover:scale-[0.98] transition-transform dark:text-zinc-300"
          onClick={() => {
            setPostToShow(postToShow + 8);
          }}
        >
          Load more
        </button>
      )}
    </>
  );
}
