import Layout from "../components/layout";
import { getAllPosts, getNavigation, getPage } from "../lib/api";
import PostCard from "../components/blog/postCard";
import { useState } from "react";

export default function Index({ data, posts, navigation }) {
  const [postToShow, setPostToShow] = useState(9);

  return (
    <Layout data={data} navigation={navigation}>
      <div className="flex flex-col items-stretch gap-6">
        <h1 className="font-bold text-3xl">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map((post, key) => {
            if (key + 1 <= postToShow) {
              return <PostCard key={key} post={post} />;
            }
          })}
        </div>
        {postToShow < posts.length && (
          <button
            className="flex flex-1 justify-center text-gray-500 rounded-2xl p-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 hover:scale-[0.98] transition-transform dark:text-zinc-300 "
            onClick={() => {
              setPostToShow(postToShow + 9);
            }}
          >
            Load more
          </button>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = (await getPage("blog")) || [];
  const posts = (await getAllPosts()) || [];
  const navigation = (await getNavigation()) || [];

  return {
    props: {
      data: data,
      posts: posts,
      navigation: navigation,
    },
    revalidate: 10,
  };
}
