import moment from "moment";
import Markdown from "./markdown";
import Link from "next/link";
import Image from "next/image";
import ServicesCta from "components/services/servicesCta";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AVATAR } from "content/site";
import type { ImageSizes, Post, PostSummary } from "lib/posts";

export default function FullPost({
  post,
  images = {},
  related = [],
  tagLinks = {},
}: {
  post: Post;
  images?: ImageSizes;
  related?: PostSummary[];
  tagLinks?: Record<string, string>;
}) {
  const cover = post.cover ? images[post.cover] : undefined;

  return (
    <>
      <nav className="m-breadcrumb" aria-label="Breadcrumb">
        <Link href="/blog">Blog</Link>
        <span className="sep">/</span>
        <span>{post.title}</span>
      </nav>

      {/* Article on the left, suggested posts in a sticky column on the
          right. Below 768px the aside drops under the article. */}
      <div className="m-post-layout">
        <article>
          <header className="m-article-head">
            {post.tags.length > 0 && (
              <div className="m-article-tags">
                {post.tags.map((tag) =>
                  // Only tags that cleared the archive threshold have a page to
                  // link to; the rest stay plain chips.
                  tagLinks[tag] ? (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tagLinks[tag]}`}
                      className="m-chip m-chip-link"
                    >
                      {tag}
                    </Link>
                  ) : (
                    <span key={tag} className="m-chip">
                      {tag}
                    </span>
                  )
                )}
              </div>
            )}
            <h1 className="m-h1 m-h1-full">{post.title}</h1>
            <p className="m-lede m-lede-wide">{post.excerpt}</p>
            <div className="m-article-byline">
              <div className="m-byline-avatar">
                <Image src={AVATAR.src} alt="" width={72} height={72} />
              </div>
              <div className="m-byline-meta">
                <strong>Surya Wiguna</strong>
                <span>
                  Published{" "}
                  {moment(post.date).format("MMM DD, YYYY")}
                </span>
              </div>
            </div>
          </header>

          {post.cover && (
            <figure className="m-cover">
              <Image
                // Only one post sets `coverAlt`; falling back to the title
                // beats shipping an empty alt.
                alt={post.coverAlt || post.title}
                src={post.cover}
                width={cover?.width ?? 1280}
                height={cover?.height ?? 720}
                // The column caps at --maxw (720px); without this Next derives
                // 1x/2x off width={1280} and the fallback src asks for w=3840.
                sizes="(min-width: 720px) 720px, 100vw"
                priority
              />
            </figure>
          )}

          <Markdown source={post.body} images={images} className="m-article" />

          <ServicesCta />

          <footer className="m-article-foot">
            <div className="m-foot-block">
              <h3>Follow new posts</h3>
              <p>
                Add the <a href="/feed.xml">RSS feed</a> to any feed reader and
                new posts show up there.
              </p>
            </div>
          </footer>
        </article>

        {related.length > 0 && (
          <aside className="m-post-aside" aria-labelledby="read-next">
            <h2 id="read-next" className="m-related-h">
              Read next
            </h2>
            <div className="m-related-list">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="m-related-card"
                >
                  <span className="m-rc-date">
                    {moment(p.date).format("MMM DD, YYYY")}
                    {p.tags[0] && ` · ${p.tags[0]}`}
                  </span>
                  <span className="m-rc-title">{p.title}</span>
                </Link>
              ))}
            </div>
            <Link href="/blog" className="m-more">
              All posts <ArrowRight className="m-icon" aria-hidden="true" />
            </Link>
          </aside>
        )}
      </div>

      <Link href="/blog" className="m-back">
        <ArrowLeft className="m-icon" aria-hidden="true" /> Back to all posts
      </Link>
    </>
  );
}
