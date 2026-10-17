import "styles/v3-blog-post.css";

import FullPost from "components/blog/fullPost";
import JsonLd from "components/jsonLd";
import { getAllPosts, getImageSizes, getPost } from "lib/posts";
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
  const post = getPost(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    // `follow` stays on so the post's own outbound links keep working while
    // the page itself drops out of the index.
    ...(post.noindex && { robots: { index: false, follow: true } }),
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: "https://suryawiguna.com/blog/" + params.slug,
      ...(post.cover && { images: [post.cover] }),
    },
    other: {
      "article:published_time": post.date,
      "article:modified_time": post.updated,
    },
  };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Every post is a file in content/posts, so the set is closed at build time
// and an unknown slug is a real 404 rather than an on-demand render.
export const dynamicParams = false;

export default async function Page({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const all = getAllPosts();
  const images = await getImageSizes(post);
  // Five fill the sticky side column without it outgrowing a laptop screen.
  const related = findRelatedPosts(post, all, 5);
  const tagLinks = Object.fromEntries(
    archivableTags(all).map((entry) => [entry.tag, entry.slug])
  );

  return (
    // .m-page-wide gives the article and its side column the 1080px canvas.
    <div className="m-page-wide">
      <FullPost
        post={post}
        images={images}
        related={related}
        tagLinks={tagLinks}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              "@id": `${POST_URL(params.slug)}#post`,
              url: POST_URL(params.slug),
              ...(post.cover && {
                // Covers sit on the Storyblok CDN; a local one needs the origin.
                image: [new URL(post.cover, SITE_URL).href],
              }),
              headline: post.title,
              description: post.excerpt,
              keywords: post.tags.join(", "),
              articleSection: post.categories,
              datePublished: post.date,
              dateModified: post.updated,
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
                { name: post.title, item: POST_URL(params.slug) },
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
    </div>
  );
}
