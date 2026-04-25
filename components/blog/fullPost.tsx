import moment from "moment";
import { RichText } from "../global";
import Link from "next/link";
import Image from "next/image";
import SubscribeForm from "./subscribe";

export default function FullPost({
  post,
  related = [],
}: {
  post: any;
  related?: any[];
}) {
  const breadcrumb = post.tag_list?.[0] || "Blog";

  return (
    <>
      <nav className="m-breadcrumb" aria-label="Breadcrumb">
        <Link href="/blog">Blog</Link>
        <span className="sep">/</span>
        <span>{breadcrumb}</span>
      </nav>

      <article>
        <header className="m-article-head">
          {post.tag_list?.length > 0 && (
            <div className="m-article-tags">
              {post.tag_list.map((tag: string) => (
                <span key={tag} className="m-chip">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="m-article-title">{post.name}</h1>
          {post.content?.excerpt && (
            <div className="m-article-dek">
              <RichText data={post.content.excerpt} />
            </div>
          )}
          <div className="m-article-byline">
            <div className="m-byline-avatar">
              <Image
                src="/images/favicon.png"
                alt=""
                width={72}
                height={72}
              />
            </div>
            <div className="m-byline-meta">
              <strong>Surya Wiguna</strong>
              <span>
                Published{" "}
                {moment(post.first_published_at).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
        </header>

        {post.content?.featured_image?.filename && (
          <figure className="m-cover">
            <Image
              alt={post.content.featured_image.alt || ""}
              src={post.content.featured_image.filename}
              width={1280}
              height={720}
              priority
            />
          </figure>
        )}

        <RichText data={post.content.content} className="m-article" />

        <footer className="m-article-foot">
          <div className="m-foot-block">
            <h3>Subscribe</h3>
            <SubscribeForm />
          </div>
          <div className="m-foot-block">
            <h3>Read more</h3>
            <Link href="/blog" className="m-back">
              ← Back to all posts
            </Link>
          </div>
        </footer>
      </article>

      {related.length > 0 && (
        <section className="m-related" aria-label="Related posts">
          <h2 className="m-related-h">Read other posts</h2>
          <div className="m-related-list">
            {related.map((p: any) => (
              <Link
                key={p.slug}
                href={`/${p.full_slug}`}
                className="m-related-card"
              >
                <span className="m-rc-date">
                  {moment(p.first_published_at).format("MMM DD, YYYY")}
                </span>
                <span className="m-rc-title">{p.name}</span>
                {p.tag_list?.length > 0 && (
                  <div className="m-rc-meta">
                    {p.tag_list.slice(0, 2).map((t: string) => (
                      <span key={t} className="m-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
