import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  linkGroups,
  primaryHeading,
  socialHeading,
  socialLinks,
} from "content/links";

const isExternal = (href: string) => /^https?:\/\//.test(href);

// Profiles first: they are what most visitors from a bio link want.
export default function Links() {
  return (
    <>
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
      {linkGroups.length > 0 && (
        <section id="links" className="m-section m-split">
          <h2 className="m-h2">{primaryHeading}</h2>
          <div className="m-link-groups">
            {linkGroups.map((group) => (
              <div key={group.id}>
                <h3 className="m-eyebrow">{group.label}</h3>
                <ul className="m-link-list">
                  {group.links.map((link) => {
                    const Icon = isExternal(link.href)
                      ? ArrowUpRight
                      : ArrowRight;
                    return (
                      <li key={link.name}>
                        <Link href={link.href} className="m-link-row">
                          <span className="m-link-name">{link.name}</span>
                          <span className="m-link-end">
                            {link.note && (
                              <span className="m-link-note">{link.note}</span>
                            )}
                            <Icon className="m-icon" aria-hidden="true" />
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
