"use client";

// Remembers the page a visitor was on before the current one, so the contact
// form can say where an enquiry came from. document.referrer alone cannot:
// client-side navigation (the nav, next/link) never updates it. sessionStorage
// lasts the tab, so it also survives the full page loads plain <a> links make.
// Renders nothing.

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const CURRENT = "page-trail:current";
const PREVIOUS = "page-trail:previous";

const isOwnSite = (url: string) => {
  try {
    return new URL(url).origin === window.location.origin;
  } catch {
    return false;
  }
};

// The full URL of the page before this one on the site, else the outside
// page that linked here, else "Direct" (typed, bookmarked, or the referrer
// was stripped). The contact route turns it into the email's From line.
export function arrivedFrom(): string {
  try {
    const previous = sessionStorage.getItem(PREVIOUS);
    if (previous) return window.location.origin + previous;
  } catch {
    // Storage blocked, fall through to the referrer.
  }

  return document.referrer || "Direct";
}

export default function PageTrail() {
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    try {
      const last = sessionStorage.getItem(CURRENT);

      if (firstRun.current && !isOwnSite(document.referrer)) {
        // Arrived from outside the site, so a stored trail is from an earlier
        // visit in this tab and would be wrong.
        sessionStorage.removeItem(PREVIOUS);
      } else if (last && last !== pathname) {
        // A reload keeps the same path and leaves the trail alone.
        sessionStorage.setItem(PREVIOUS, last);
      }

      sessionStorage.setItem(CURRENT, pathname);
    } catch {
      // Storage blocked (private mode, cookies off): arrivedFrom falls back
      // to the referrer.
    }

    firstRun.current = false;
  }, [pathname]);

  return null;
}
