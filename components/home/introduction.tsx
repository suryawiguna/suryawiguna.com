import Image from "next/image";
import Link from "next/link";
import { hero } from "content/home";
import { CONTACT_HREF, contactCta } from "content/services";

export default function Introduction() {
  return (
    <header id="home" className="m-hero m-hero-left m-home-hero">
      <div className="m-masthead">
        <div className="m-avatar">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={88}
            height={88}
            priority
          />
        </div>
        <div>
          <p className="m-masthead-name">{hero.identity}</p>
          <p className="m-status">
            <span className="m-dot"></span>
            <span>{hero.status}</span>
          </p>
        </div>
      </div>
      <h1 className="m-h1 m-h1-display">{hero.headline}</h1>
      <div className="m-hero-foot">
        <div className="m-lede">
          <p>{hero.description}</p>
        </div>
        <div className="m-cta-row">
          <Link href="/portfolio" className="m-btn primary">
            See my work
          </Link>
          <a href={CONTACT_HREF} className="m-btn ghost">
            {contactCta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
