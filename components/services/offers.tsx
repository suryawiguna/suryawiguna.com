import Link from "next/link";
import type { Offer } from "content/services";
import { ArrowRight } from "lucide-react";

// Both variants are the same numbered columns. `detailed` is the /services
// one: full copy instead of the card blurb, and each offer gets an id so the
// home page cards can deep link to it.
const num = (index: number) => String(index + 1).padStart(2, "0");

export default function Offers({
  heading,
  offers,
  detailed = false,
  more,
}: {
  heading: string;
  offers: Offer[];
  detailed?: boolean;
  more?: { href: string; label: string };
}) {
  return (
    <section id="services" className="m-section">
      {more ? (
        <div className="m-section-head">
          <h2 className="m-h2">{heading}</h2>
          <Link href={more.href} className="m-more">
            {more.label} <ArrowRight className="m-icon" aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <h2 className="m-h2">{heading}</h2>
      )}

      {detailed ? (
        <ul className="m-offer-grid">
          {offers.map((offer, index) => (
            <li key={offer.slug} id={offer.slug} className="m-offer-full">
              <span className="m-offer-num" aria-hidden="true">
                {num(index)}
              </span>
              <h3 className="m-offer-title">{offer.title}</h3>
              {offer.detail.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="m-offer-body">
                  {paragraph}
                </p>
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="m-offer-grid">
          {offers.map((offer, index) => (
            <li key={offer.slug}>
              <Link
                href={`/services#${offer.slug}`}
                className="m-offer"
                aria-label={`Learn more about ${offer.title}`}
              >
                <span className="m-offer-num" aria-hidden="true">
                  {num(index)}
                </span>
                <h3 className="m-offer-title">{offer.title}</h3>
                <p className="m-offer-body">{offer.cardBlurb}</p>
                <span className="m-offer-more">
                  View service{" "}
                  <ArrowRight className="m-icon" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
