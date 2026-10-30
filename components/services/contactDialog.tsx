"use client";

// The enquiry form as a popup. Every "start a project" button is a plain link
// to CONTACT_HREF, so it works before JavaScript loads. After that, a click on
// one anywhere but /services opens the form here, over the page the visitor
// was reading, and that page becomes the email's From line. On /services the
// link just scrolls to the inline form. Mounted once, in the root layout.
//
// Native <dialog>: showModal() traps focus, closes on Esc and makes the page
// behind it inert, so none of that is hand-rolled here.

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { EnquiryForm } from "components/services/contactForm";
import { CONTACT_HREF, servicesPage } from "content/services";

const FORM_PAGE = CONTACT_HREF.split("#")[0];

export default function ContactDialog() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  // The URL it last opened on. Null until the first open, so pages that
  // never open it never render the form. It stays mounted after closing, so
  // a stray click on the backdrop does not throw away what was typed.
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      // Cmd/ctrl/shift-clicks and middle clicks still open a tab or window.
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      if (pathname === FORM_PAGE) return;

      const link = (event.target as Element | null)?.closest?.(
        `a[href="${CONTACT_HREF}"]`
      );
      if (!link) return;

      event.preventDefault();
      setSource(window.location.origin + pathname);
      dialogRef.current?.showModal();
    }

    // Capture phase, so this runs before any next/link handler would navigate.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      className="m-dialog"
      aria-labelledby={titleId}
      // A click on the backdrop lands on the <dialog> itself; one inside the
      // panel lands on something in it.
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      {source !== null && (
        <div className="m-dialog-panel">
          <div className="m-dialog-head">
            <h2 id={titleId} className="m-h2">
              {servicesPage.contactHeading}
            </h2>
            <button
              type="button"
              className="m-dialog-close"
              aria-label="Close"
              onClick={close}
            >
              <X className="m-icon" aria-hidden="true" />
            </button>
          </div>
          <p className="m-section-intro">{servicesPage.contactIntro}</p>
          <EnquiryForm source={source} />
        </div>
      )}
    </dialog>
  );
}
