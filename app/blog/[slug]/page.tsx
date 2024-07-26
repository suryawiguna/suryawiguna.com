import FullPost from "components/blog/fullPost";
import Sidebar from "components/blog/sidebar";
import JsonLd from "components/jsonLd";
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
    description: post.content.excerpt,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: post.name,
      description: post.content.excerpt,
      type: "article",
      url: "https://suryawiguna.com/blog/" + params.slug,
      images: [`${post.content.featured_image.filename}`],
    },
    other: {
      "article:published_time": post.first_published_at,
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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          url: "https://suryawiguna.com/blog/" + params.slug,
          image: [post.content.featured_image.filename],
          headline: post.name,
          datePublished: post.first_published_at,
          dateModified: post.first_published_at,
          mainEntityOfPage: {
            "@type": "Website",
            "@id": "https://suryawiguna.com/blog/" + params.slug,
          },
          author: {
            "@type": "Person",
            name: "Surya Wiguna",
            url: "https://suryawiguna.com",
          },
          publisher: {
            "@type": "Organization",
            name: "Surya Wiguna Blog",
            logo: {
              "@type": "ImageObject",
              url: "https://a.storyblok.com/f/169901/1080x1080/b793aa9e72/favicon.png",
            },
          },
        }}
      />
    </div>
  );
}

export const revalidate = 60;
