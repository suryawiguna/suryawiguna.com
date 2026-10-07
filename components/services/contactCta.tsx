import Link from "next/link";
import { contactCta } from "content/services";
import { EMAIL } from "content/site";

// Stands in for components/services/contactForm.tsx while that is parked.
// A mailto is higher friction than a form, but it cannot lose an enquiry,
// which the form could until its delivery problem is understood.
// Heading in the left column, like every other closing section.
export default function ContactCta() {
  return (
    <section id="contact" className="m-section m-split">
      <h2 className="m-h2">{contactCta.heading}</h2>
      <div>
        <div className="m-lede m-lede-wide">
          {contactCta.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
        <div className="m-cta-row">
          <Link
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(
              contactCta.subject
            )}`}
            className="m-btn primary"
          >
            {contactCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
