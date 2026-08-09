import Link from "next/link";
import type { Offer } from "content/services";

// `detailed` is the /services variant: full copy instead of the card blurb,
// and each offer gets an id so the home page cards can deep link to it.
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
      <h2 className="m-h2">{heading}</h2>

      {detailed ? (
        <div className="m-offer-list">
          {offers.map((offer) => (
            <article key={offer.slug} id={offer.slug} className="m-offer-full">
              <div className="m-offer-head">
                <h3 className="m-offer-title">{offer.title}</h3>
                <span className="m-offer-price">{offer.priceFrom}</span>
              </div>
              {offer.detail.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="m-offer-body">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      ) : (
        <ul className="m-offer-grid">
          {offers.map((offer) => (
            <li key={offer.slug} className="m-offer">
              <h3 className="m-offer-title">{offer.title}</h3>
              <p className="m-offer-body">{offer.cardBlurb}</p>
              <span className="m-offer-price">{offer.priceFrom}</span>
            </li>
          ))}
        </ul>
      )}

      {more && (
        <Link href={more.href} className="m-more">
          {more.label}
        </Link>
      )}
    </section>
  );
}
