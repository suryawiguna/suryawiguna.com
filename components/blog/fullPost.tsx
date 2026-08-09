import moment from "moment";
import { RichText } from "../global";
import Link from "next/link";
import Image from "next/image";
import SubscribeForm from "./subscribe";
import ServicesCta from "components/services/servicesCta";

// Some posts repeat the title (as an <h1>) and the excerpt (as an intro
// paragraph) at the top of the body — the header already renders both. Drop
// that leading duplicate. Posts authored cleanly start with a paragraph, not
// an h1, so this only triggers on the duplicated ones.
function stripDuplicateLead(doc: any, title: string) {
  const nodes = doc?.content;
  if (!Array.isArray(nodes) || !nodes.length) return doc;

  const first = nodes[0];
  const firstText = first?.content?.[0]?.text?.trim();
  const isTitleHeading =
    first?.type === "heading" &&
    first?.attrs?.level === 1 &&
    firstText === title?.trim();
  if (!isTitleHeading) return doc;

  // Drop the title heading, plus an immediately-following intro paragraph.
  const cut = nodes[1]?.type === "paragraph" ? 2 : 1;
  return { ...doc, content: nodes.slice(cut) };
}

export default function FullPost({
  post,
  related = [],
  tagLinks = {},
}: {
  post: any;
  related?: any[];
  tagLinks?: Record<string, string>;
}) {
  const bodyContent = stripDuplicateLead(post.content.content, post.name);

  return (
    <>
      <nav className="m-breadcrumb" aria-label="Breadcrumb">
        <Link href="/blog">Blog</Link>
        <span className="sep">/</span>
        <span>{post.name}</span>
      </nav>

      <article>
        <header className="m-article-head">
          {post.tag_list?.length > 0 && (
            <div className="m-article-tags">
              {post.tag_list.map((tag: string) =>
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
              // 36 of 37 featured images have no alt set in Storyblok; falling
              // back to the title beats shipping an empty one. Remove the
              // fallback once the field is filled in.
              alt={post.content.featured_image.alt || post.name}
              src={post.content.featured_image.filename}
              width={1280}
              height={720}
              // The column caps at --maxw (720px); without this Next derives
              // 1x/2x off width={1280} and the fallback src asks for w=3840.
              sizes="(min-width: 720px) 720px, 100vw"
              priority
            />
          </figure>
        )}

        <RichText data={bodyContent} className="m-article" />

        <ServicesCta />

        <footer className="m-article-foot">
          <div className="m-foot-block">
            <h3>Subscribe</h3>
            <SubscribeForm />
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

      <Link href="/blog" className="m-back">
        ← Back to all posts
      </Link>
    </>
  );
}
