import Link from "next/link";
import { EMAIL } from "content/site";
import { socialLinks } from "content/links";

// Email first, then every profile except the mailto, which the address
// already covers.
const profiles = socialLinks.filter((link) => !link.href.startsWith("mailto:"));

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="m-foot">
      <a href={`mailto:${EMAIL}`} className="m-foot-email">
        {EMAIL}
      </a>
      <ul className="m-foot-links">
        {profiles.map((link) => (
          <li key={link.name}>
            <Link href={link.href} target="_blank" rel="noreferrer">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <span className="m-foot-legal">
        © {year} Surya Wiguna · Bali, Indonesia
      </span>
    </footer>
  );
}
