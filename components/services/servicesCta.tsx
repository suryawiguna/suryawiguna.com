import Link from "next/link";
import { blogCta, CONTACT_HREF, contactCta } from "content/services";

// Rendered under every blog post, so one edit here reaches all of them. The
// main button is a plain link to CONTACT_HREF, which ContactDialog turns into
// the popup form over the post; the post becomes the enquiry's From line.
export default function ServicesCta() {
  return (
    <aside className="m-cta-card">
      <h2 className="m-cta-card-title">{blogCta.heading}</h2>
      <p className="m-cta-card-body">{blogCta.body}</p>
      <div className="m-cta-row">
        <a href={CONTACT_HREF} className="m-btn primary">
          {contactCta.label}
        </a>
        <Link href={blogCta.href} className="m-btn ghost">
          {blogCta.label}
        </Link>
      </div>
    </aside>
  );
}
