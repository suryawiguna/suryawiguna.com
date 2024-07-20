"use client";

import { useState } from "react";
import PostCard from "./postCard";

export default function PostGrid({ posts }) {
  const [postToShow, setPostToShow] = useState(8);

  return (
    <>
      <div className="grid grid-cols-1  gap-6">
        {posts.map((post: any, key: number) => (
          <PostCard key={key} post={post} show={key + 1 <= postToShow} />
        ))}
      </div>
      {postToShow < posts.length && (
        <button
          className="flex flex-1 justify-center text-gray-500 rounded-lg p-4 bg-zinc-100 hover:bg-zinc-200   hover:scale-[0.99] transition-transform"
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
