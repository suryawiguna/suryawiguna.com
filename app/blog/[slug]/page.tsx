import FullPost from "components/blog/fullPost";
import Sidebar from "components/blog/sidebar";
import { getAllPosts, getPost } from "lib/api";
import { MetadataProps } from "lib/helper";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.name,
    description: post.content.excerption,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: post.name,
      description: post.content.excerption,
      type: "article",
      images: [`${post.content.featured_image.filename}`],
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

  return (
    <div className="flex flex-col gap-10">
      <FullPost post={post} />
      <Sidebar />
    </div>
  );
}

export const revalidate = 60;
