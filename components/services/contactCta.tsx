import { CONTACT_HREF, contactCta } from "content/services";

// Closing section on the home and portfolio pages, pointing at the contact
// form on /services. /services renders the form itself in this spot.
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
          <a href={CONTACT_HREF} className="m-btn primary">
            {contactCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
