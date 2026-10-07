import Link from "next/link";
import moment from "moment";
import { getAllPosts } from "lib/api";
import { ArrowRight } from "lucide-react";

export default async function BlogPosts() {
  const posts = await getAllPosts(3);

  return (
    <section id="blog" className="m-section">
      <h2 className="m-h2">Latest writing</h2>
      <ul className="m-posts">
        {posts.map((post: any, key: number) => (
          <li key={key}>
            <Link href={`/${post.full_slug}`} className="m-post">
              <span className="m-post-title">{post.name}</span>
              <span className="m-post-date">
                {moment(post.first_published_at).format("MMM DD, YYYY")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/blog" className="m-more">
        All posts <ArrowRight className="m-icon" aria-hidden="true" />
      </Link>
    </section>
  );
}
