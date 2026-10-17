import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import type { PostSummary } from "lib/posts";

// One post in the /blog and /blog/tag grids: cover, date and first tag, title,
// excerpt. The same image-over-text card as a portfolio project.
export default function PostCard({
  post,
  hidden = false,
}: {
  post: PostSummary;
  // Off-page posts on /blog stay in the DOM for crawlers; see PostGrid.
  hidden?: boolean;
}) {
  const date = moment(post.date).format("MMM DD, YYYY");
  const topic = post.tags[0];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="m-bp"
      hidden={hidden}
      aria-hidden={hidden ? "true" : undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <div className="m-bp-media">
        {post.cover && (
          <Image
            src={post.cover}
            alt={post.coverAlt || post.title}
            fill
            sizes="(max-width: 560px) 100vw, (max-width: 768px) 50vw, 340px"
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <div className="m-bp-body">
        <p className="m-bp-meta">
          {date}
          {topic && ` · ${topic}`}
        </p>
        <h2 className="m-bp-title">{post.title}</h2>
        <p className="m-bp-excerpt">{post.excerpt}</p>
      </div>
    </Link>
  );
}
