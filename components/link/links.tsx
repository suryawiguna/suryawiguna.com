import Link from "next/link";
import { primaryLinks, socialHeading, socialLinks } from "content/links";

export default function Links() {
  return (
    <section id="links" className="m-section">
      {socialLinks.length > 0 && (
        <>
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
        </>
      )}
      {primaryLinks.length > 0 && (
        <div
          className="m-links"
          style={{
            flexDirection: "column",
            alignItems: "stretch",
            marginTop: socialLinks.length > 0 ? "1.4rem" : 0,
          }}
        >
          {primaryLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="m-btn ghost"
              style={{ justifyContent: "center" }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
