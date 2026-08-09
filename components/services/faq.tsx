import Link from "next/link";
import type { Faq } from "content/services";

// Native <details> so the answers are in the HTML for crawlers and need no JS.
// The optional `link` is rendered here but deliberately left out of the
// FAQPage JSON-LD, which wants plain-text answers.
export default function Faqs({
  heading,
  items,
}: {
  heading: string;
  items: Faq[];
}) {
  return (
    <section id="faq" className="m-section">
      <h2 className="m-h2">{heading}</h2>
      <div className="m-faq">
        {items.map((item) => (
          <details key={item.q} className="m-faq-item">
            <summary className="m-faq-q">{item.q}</summary>
            <div className="m-faq-a">
              <p>{item.a}</p>
              {item.link && (
                <Link href={item.link.href} className="m-faq-link">
                  {item.link.label}
                </Link>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
