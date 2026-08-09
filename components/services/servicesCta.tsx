import Link from "next/link";
import { blogCta } from "content/services";

// Rendered under every blog post. Post bodies are Storyblok rich text, so
// putting the CTA here covers every post at once without a CMS edit.
export default function ServicesCta() {
  return (
    <aside className="m-cta-card">
      <h2 className="m-cta-card-title">{blogCta.heading}</h2>
      <p className="m-cta-card-body">{blogCta.body}</p>
      <Link href={blogCta.href} className="m-btn primary">
        {blogCta.label}
      </Link>
    </aside>
  );
}
