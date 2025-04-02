"use client";

import { useState } from "react";
import PostCard from "./postCard";

export default function PostGrid({ posts }) {
  const [postToShow, setPostToShow] = useState(8);

  return (
    <>
      <div className="grid grid-cols-1 gap-7">
        {posts.map((post: any, key: number) => (
          <PostCard key={key} post={post} show={key + 1 <= postToShow} />
        ))}
      </div>
      {postToShow < posts.length && (
        <button
          className="flex flex-1 justify-center text-gray-500 hover:underline underline-offset-8"
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
