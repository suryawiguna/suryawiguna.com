import Link from "next/link";

export default function Links({ blok }) {
  const social = blok.links.filter((l: any) => l.socialLink);
  const primary = blok.links.filter((l: any) => !l.socialLink);

  return (
    <section id="links" className="m-section">
      {social.length > 0 && (
        <>
          <h2 className="m-h2">Explore my other stuff</h2>
          <div className="m-links">
            {social.map((link: any, key: number) => (
              <Link
                key={key}
                href={link.link.url || link.link.cached_url}
                target={link.linktype == "url" ? "_blank" : undefined}
                className="m-chip m-chip-link"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </>
      )}
      {primary.length > 0 && (
        <div
          className="m-links"
          style={{
            flexDirection: "column",
            alignItems: "stretch",
            marginTop: social.length > 0 ? "1.4rem" : 0,
          }}
        >
          {primary.map((link: any, key: number) => (
            <Link
              key={key}
              href={link.link.url || link.link.cached_url}
              target={link.linktype == "url" ? "_blank" : undefined}
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
