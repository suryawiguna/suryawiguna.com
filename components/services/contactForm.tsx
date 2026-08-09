"use client";

// PARKED, not rendered anywhere. /services shows components/services/
// contactCta.tsx instead. The form and app/api/contact both work (validated
// end to end in a browser: correct body, honeypot, reset, success state) but
// Brevo accepted the test sends and the mail never arrived, so shipping this
// would mean silently losing enquiries. Re-import it in app/services/page.tsx
// once delivery is confirmed in the Brevo transactional log.

import { useState } from "react";
import { BUDGET_RANGES, OFFERS, servicesPage } from "content/services";
import { EMAIL } from "content/site";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(body.error || "Something went wrong. Please try again.");
        return;
      }

      form.reset();
      setStatus("sent");
      setMessage("Thanks. I will get back to you within a day or two.");
    } catch {
      setStatus("error");
      setMessage(
        `Could not send that. Please email me at ${EMAIL} instead.`
      );
    }
  }

  return (
    <section id="contact" className="m-section">
      <h2 className="m-h2">{servicesPage.contactHeading}</h2>
      <p className="m-section-intro">{servicesPage.contactIntro}</p>

      <form className="m-form" onSubmit={handleSubmit}>
        <div className="m-field">
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" required />
        </div>

        <div className="m-field">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" required />
        </div>

        <div className="m-field">
          <label htmlFor="contact-project">What do you need?</label>
          <select id="contact-project" name="projectType" defaultValue="">
            <option value="" disabled>
              Pick one
            </option>
            {OFFERS.map((offer) => (
              <option key={offer.slug} value={offer.title}>
                {offer.title}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </div>

        <div className="m-field">
          <label htmlFor="contact-budget">Budget</label>
          <select id="contact-budget" name="budget" defaultValue="">
            <option value="" disabled>
              Pick a range
            </option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div className="m-field m-field-wide">
          <label htmlFor="contact-message">
            Tell me about the project
          </label>
          <textarea id="contact-message" name="message" rows={5} required />
        </div>

        {/* Honeypot. Hidden from people, irresistible to bots. */}
        <div className="m-honeypot" aria-hidden="true">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="m-form-actions">
          <button
            type="submit"
            className="m-btn primary"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send it"}
          </button>
          <span className="m-form-alt">
            Or email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </span>
        </div>

        {message && (
          <p
            className={`m-form-msg${status === "error" ? " is-error" : ""}`}
            role="status"
          >
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
