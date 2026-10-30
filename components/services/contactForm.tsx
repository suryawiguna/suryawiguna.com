"use client";

// The enquiry form lives in two places: the closing section of /services (the
// default export) and the popup every "start a project" button opens on other
// pages (components/services/contactDialog.tsx). Both POST to app/api/contact,
// which emails the enquiry through Brevo.

import { useId, useState } from "react";
import { arrivedFrom } from "components/global/pageTrail";
import { OFFERS, servicesPage } from "content/services";
import { EMAIL } from "content/site";

type Status = "idle" | "sending" | "sent" | "error";

type EnquiryFormProps = {
  // The URL the email's From line names. The popup passes the page it opened
  // on; the /services section leaves it to arrivedFrom().
  source?: string;
};

export function EnquiryForm({ source }: EnquiryFormProps) {
  // Field ids from useId, since the form can be on a page twice.
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const data = {
      ...Object.fromEntries(new FormData(form).entries()),
      // Not a field: which page sent them here, so the email can say.
      ref: source ?? arrivedFrom(),
    };

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
      // The address already sits beside the button, so no need to repeat it.
      setMessage("Could not send that. Please try again, or email me instead.");
    }
  }

  return (
    <form className="m-form" onSubmit={handleSubmit}>
      <div className="m-field">
        <label htmlFor={`${id}-name`}>Name</label>
        <input id={`${id}-name`} name="name" type="text" required />
      </div>

      <div className="m-field">
        <label htmlFor={`${id}-email`}>Email</label>
        <input id={`${id}-email`} name="email" type="email" required />
      </div>

      <div className="m-field m-field-wide">
        <label htmlFor={`${id}-project`}>What do you need?</label>
        <select id={`${id}-project`} name="projectType" defaultValue="">
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

      <div className="m-field m-field-wide">
        <label htmlFor={`${id}-message`}>Tell me about the project</label>
        <textarea id={`${id}-message`} name="message" rows={5} required />
      </div>

      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div className="m-honeypot" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input
          id={`${id}-company`}
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
        {/* Always rendered so screen readers announce the swap: the
            email fallback, then the thanks once it has gone. */}
        <p
          className={`m-form-alt${status === "sent" ? " is-sent" : ""}`}
          role="status"
        >
          {status === "sent" ? (
            message
          ) : (
            <>
              Or email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </>
          )}
        </p>
      </div>

      {status === "error" && (
        <p className="m-form-msg" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}

export default function ContactForm() {
  return (
    // Same split as ContactCta, so swapping one for the other keeps the layout.
    <section id="contact" className="m-section m-split">
      <h2 className="m-h2">{servicesPage.contactHeading}</h2>
      <div>
        <p className="m-section-intro">{servicesPage.contactIntro}</p>
        <EnquiryForm />
      </div>
    </section>
  );
}
