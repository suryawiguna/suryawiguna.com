import Link from "next/link";
import { contactCta } from "content/services";
import { EMAIL } from "content/site";

// Stands in for components/services/contactForm.tsx while that is parked.
// A mailto is higher friction than a form, but it cannot lose an enquiry,
// which the form could until its delivery problem is understood.
export default function ContactCta() {
  return (
    <section id="contact" className="m-section">
      <h2 className="m-h2">{contactCta.heading}</h2>
      <div className="m-lede" style={{ textAlign: "left", margin: 0 }}>
        {contactCta.body.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
      <div className="m-cta-row" style={{ justifyContent: "flex-start" }}>
        <Link
          href={`mailto:${EMAIL}?subject=${encodeURIComponent(
            contactCta.subject
          )}`}
          className="m-btn primary"
        >
          {contactCta.label}
        </Link>
      </div>
    </section>
  );
}
