import "styles/v3-blog-index.css";

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getAllPosts } from "lib/api";
import JsonLd from "components/jsonLd";
import PostCard from "components/blog/postCard";
import { archivableTags, postsForTag, tagFromSlug } from "lib/tags";
import { ArrowLeft } from "lucide-react";

const SITE_URL = "https://suryawiguna.com";

export async function generateStaticParams() {
  const posts = (await getAllPosts()) || [];
  return archivableTags(posts).map((entry) => ({ tag: entry.slug }));
}

// The archive set is closed and known at build time. Without this, an unknown
// tag renders the not-found page behind a 200 — a soft 404 — because the
// notFound() below gets captured by the ISR cache. Trade-off: a tag that newly
// crosses MIN_POSTS_PER_TAG needs a redeploy before its archive exists.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const posts = (await getAllPosts()) || [];
  const tag = tagFromSlug(posts, params.tag);
  if (!tag) return {};

  const count = postsForTag(posts, tag).length;

  return {
    title: `${tag} — Articles | Surya Wiguna`,
    description: `${count} articles on ${tag} by Surya Wiguna, a freelance web developer in Bali.`,
    alternates: { canonical: `/blog/tag/${params.tag}` },
    openGraph: {
      title: `${tag} — Articles | Surya Wiguna`,
      description: `${count} articles on ${tag} by Surya Wiguna, a freelance web developer in Bali.`,
      url: `${SITE_URL}/blog/tag/${params.tag}`,
      type: "website",
    },
  };
}

export default async function TagArchive({
  params,
}: {
  params: { tag: string };
}) {
  const posts = (await getAllPosts()) || [];
  const tag = tagFromSlug(posts, params.tag);

  // Tags below the threshold have no archive, so this is a genuine 404 rather
  // than an empty page.
  if (!tag) notFound();

  const tagged = postsForTag(posts, tag);
  const others = archivableTags(posts).filter(
    (entry) => entry.slug !== params.tag
  );

  return (
    // .m-page-wide widens <main> to the 1080px canvas, as on /blog.
    <div className="m-page-wide">
      <nav className="m-breadcrumb" aria-label="Breadcrumb">
        <Link href="/blog">Blog</Link>
        <span className="sep">/</span>
        <span>{tag}</span>
      </nav>

      <header className="m-hero m-hero-left m-hero-tight">
        <p className="m-eyebrow">Topic</p>
        <h1 className="m-h1 m-h1-wide">{tag}</h1>
        <p className="m-lede m-lede-wide">
          {tagged.length} {tagged.length === 1 ? "article" : "articles"} on{" "}
          {tag}.
        </p>
      </header>

      <section className="m-blog-list">
        {tagged.map((post: any) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>

      {others.length > 0 && (
        <section className="m-section">
          <h2 className="m-h2">Other topics</h2>
          <div className="m-links">
            {others.map((entry) => (
              <Link
                key={entry.slug}
                href={`/blog/tag/${entry.slug}`}
                className="m-chip m-chip-link"
              >
                {entry.tag} ({entry.count})
              </Link>
            ))}
          </div>
        </section>
      )}

      <Link href="/blog" className="m-back">
        <ArrowLeft className="m-icon" aria-hidden="true" /> Back to all posts
      </Link>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${SITE_URL}/blog/tag/${params.tag}#page`,
              url: `${SITE_URL}/blog/tag/${params.tag}`,
              name: `${tag} — Articles`,
              isPartOf: { "@id": `${SITE_URL}/#website` },
              about: { "@type": "Thing", name: tag },
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: tagged.length,
                itemListElement: tagged.map((post: any, index: number) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: `${SITE_URL}/${post.full_slug}`,
                  name: post.name,
                })),
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { name: "Home", item: SITE_URL },
                { name: "Blog", item: `${SITE_URL}/blog` },
                { name: tag, item: `${SITE_URL}/blog/tag/${params.tag}` },
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
