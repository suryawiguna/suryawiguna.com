import "styles/v3-blog-index.css";

import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getAllPosts } from "lib/api";
import JsonLd from "components/jsonLd";
import { richTextToPlain } from "lib/helper";
import { archivableTags, postsForTag, tagFromSlug } from "lib/tags";

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
    <>
      <nav className="m-breadcrumb" aria-label="Breadcrumb">
        <Link href="/blog">Blog</Link>
        <span className="sep">/</span>
        <span>{tag}</span>
      </nav>

      <header className="m-blog-head">
        <p className="m-eyebrow">Topic</p>
        <h1 className="m-blog-title">{tag}</h1>
        <p className="m-blog-dek">
          {tagged.length} {tagged.length === 1 ? "article" : "articles"} on{" "}
          {tag}.
        </p>
      </header>

      <section className="m-blog-list">
        {tagged.map((post: any) => {
          const excerpt = richTextToPlain(post.content?.excerpt);
          return (
            <Link key={post.slug} href={`/${post.full_slug}`} className="m-bp">
              {post.content?.featured_image?.filename && (
                <div className="m-bp-img">
                  <Image
                    src={post.content.featured_image.filename}
                    alt={post.content.featured_image.alt || post.name}
                    fill
                    sizes="96px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <div className="m-bp-right">
                <h2 className="m-bp-title">{post.name}</h2>
                <div className="m-bp-meta">
                  <span>
                    {moment(post.first_published_at).format("MMM DD, YYYY")}
                  </span>
                </div>
              </div>
              <div className="m-bp-body">
                {excerpt && <p className="m-bp-excerpt">{excerpt}</p>}
              </div>
            </Link>
          );
        })}
      </section>

      {others.length > 0 && (
        <section className="m-section" style={{ borderBottom: 0 }}>
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
        ← Back to all posts
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
    </>
  );
}
