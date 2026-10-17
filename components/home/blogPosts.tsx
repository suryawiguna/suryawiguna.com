import Link from "next/link";
import moment from "moment";
import { getAllPosts } from "lib/posts";
import { ArrowRight } from "lucide-react";

export default function BlogPosts() {
  const posts = getAllPosts(3);

  return (
    <section id="blog" className="m-section m-split">
      <h2 className="m-h2">Latest writing</h2>
      <div>
        <ul className="m-posts">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="m-post">
                <span className="m-post-date">
                  {moment(post.date).format("MMM DD, YYYY")}
                </span>
                <span className="m-post-title">{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/blog" className="m-more">
          All posts <ArrowRight className="m-icon" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
