import Layout from "../components/layout";
import { getAllPosts, getNavigation, getPage } from "../lib/api";
import { RichText } from "../components/global";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import styled from "styled-components";
import PostCard from "../components/blog/postCard";

export default function Index({ data, posts, navigation }) {
  return (
    <Layout data={data} navigation={navigation}>
      <div className="flex flex-col items-start gap-6">
        <h1 className="font-bold text-3xl">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map((post, key) => {
            return (
              <PostCard key={key} post={post}/>
            );
          })}
        </div>
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
