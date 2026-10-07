import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  primaryHeading,
  primaryLinks,
  socialHeading,
  socialLinks,
} from "content/links";

const isExternal = (href: string) => /^https?:\/\//.test(href);

export default function Links() {
  return (
    <>
      {primaryLinks.length > 0 && (
        <section id="links" className="m-section m-split">
          <h2 className="m-h2">{primaryHeading}</h2>
          <ul className="m-link-list">
            {primaryLinks.map((link) => {
              const Icon = isExternal(link.href) ? ArrowUpRight : ArrowRight;
              return (
                <li key={link.name}>
                  <Link href={link.href} className="m-link-row">
                    {link.name}
                    <Icon className="m-icon" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {socialLinks.length > 0 && (
        <section id="profiles" className="m-section m-split">
          <h2 className="m-h2">{socialHeading}</h2>
          <div className="m-links">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="m-chip m-chip-link"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
