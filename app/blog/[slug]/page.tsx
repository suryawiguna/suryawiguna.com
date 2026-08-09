import "styles/v3-blog-post.css";

import FullPost from "components/blog/fullPost";
import JsonLd from "components/jsonLd";
import { getAllPosts, getPost, isNoindex } from "lib/api";
import { MetadataProps } from "lib/helper";
import { findRelatedPosts } from "lib/related";
import { archivableTags } from "lib/tags";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

const SITE_URL = "https://suryawiguna.com";
const PERSON_ID = `${SITE_URL}/#person`;
const POST_URL = (slug: string) => `${SITE_URL}/blog/${slug}`;

export async function generateMetadata(
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  return {
    title: post.name,
    description: post.content.excerpt,
    // `follow` stays on so the post's own outbound links keep working while
    // the page itself drops out of the index.
    ...(isNoindex(post) && { robots: { index: false, follow: true } }),
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
  // by_slugs returns an empty list for an unknown slug, so getPost yields
  // undefined and every `post.*` read below used to throw a 500 at crawlers.
  if (!post) notFound();

  const all = (await getAllPosts()) || [];
  const related = findRelatedPosts(post, all);
  const tagLinks = Object.fromEntries(
    archivableTags(all).map((entry) => [entry.tag, entry.slug])
  );

  return (
    <>
      <FullPost post={post} related={related} tagLinks={tagLinks} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              "@id": `${POST_URL(params.slug)}#post`,
              url: POST_URL(params.slug),
              image: [post.content.featured_image.filename],
              headline: post.name,
              description: post.content.excerpt,
              keywords: post.tag_list?.join(", "),
              articleSection: post.content.categories?.map((c: any) => c.name),
              datePublished: post.first_published_at,
              dateModified: post.first_published_at,
              inLanguage: "en",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": POST_URL(params.slug),
              },
              author: { "@id": PERSON_ID },
              publisher: { "@id": PERSON_ID },
            },
            {
              "@type": "Person",
              "@id": PERSON_ID,
              name: "Surya Wiguna",
              url: SITE_URL,
              jobTitle: "Freelance Web Developer",
              image:
                "https://a.storyblok.com/f/169901/877x895/eed121f43d/me.jpeg",
              sameAs: [
                "https://www.linkedin.com/in/suryawigunaa/",
                "https://www.behance.net/suryawiguna",
                "https://dribbble.com/suryawigunaa",
                "https://www.tiktok.com/@suryawigunaaaa",
              ],
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { name: "Home", item: SITE_URL },
                { name: "Blog", item: `${SITE_URL}/blog` },
                { name: post.name, item: POST_URL(params.slug) },
              ].map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: crumb.name,
                item: crumb.item,
              })),
            },
          ],
        }}
      />
    </>
  );
}

export const revalidate = 60;
