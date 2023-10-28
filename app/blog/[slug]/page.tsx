import FullPost from "components/blog/fullPost";
import Sidebar from "components/blog/sidebar";
import { getAllPosts, getFeaturedPosts, getPost } from "lib/api";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params.slug);
  const featuredImage = await post.featured_image;

  // optionally access and extend (rather than replace) parent metadata
  return {
    title: post.name,
    openGraph: {
      title: post.name,
      //   images: [`${featuredImage.filename}`, ...previousImages],
    },
  };
}

export async function generateStaticParams() {
  const posts = (await getAllPosts()) || [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }) {
  const post = await getPost(params.slug);
  const featuredPosts = (await getFeaturedPosts()) || [];

  return (
    <div className="flex flex-col gap-10">
      <FullPost post={post} />
      <Sidebar featuredPosts={featuredPosts} />
    </div>
  );
}

export const revalidate = 60;
