import Link from "next/link";
import moment from "moment";
import { getAllPosts } from "lib/api";

export default async function BlogPosts() {
  // getAllPosts returns undefined when the Storyblok call fails or the token
  // is missing — `data?.PostItems.items` short-circuits rather than throwing.
  // Mapping that directly took the whole home page down with it, so an
  // unreachable CMS now costs the section, not the page.
  const posts = await getAllPosts(5);

  if (!posts?.length) return null;

  return (
    <section id="blog" className="m-section">
      <h2 className="m-h2">Recent Blog Posts</h2>
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
        Other blog posts →
      </Link>
    </section>
  );
}
