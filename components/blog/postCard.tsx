import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { richTextToPlain } from "lib/helper";

// One post in the /blog and /blog/tag grids: cover, date and first tag, title,
// excerpt. The same image-over-text card as a portfolio project.
export default function PostCard({
  post,
  hidden = false,
}: {
  post: any;
  // Off-page posts on /blog stay in the DOM for crawlers; see PostGrid.
  hidden?: boolean;
}) {
  const excerpt = richTextToPlain(post.content?.excerpt);
  const image = post.content?.featured_image;
  const date = moment(post.first_published_at).format("MMM DD, YYYY");
  const topic = post.tag_list?.[0];

  return (
    <Link
      href={`/${post.full_slug}`}
      className="m-bp"
      hidden={hidden}
      aria-hidden={hidden ? "true" : undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <div className="m-bp-media">
        {image?.filename && (
          <Image
            src={image.filename}
            alt={image.alt || post.name}
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
        <h2 className="m-bp-title">{post.name}</h2>
        {excerpt && <p className="m-bp-excerpt">{excerpt}</p>}
      </div>
    </Link>
  );
}
