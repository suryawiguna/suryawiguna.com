import Image from "next/image";
import Link from "next/link";
import { hero } from "content/home";
import { EMAIL } from "content/site";

export default function Introduction() {
  return (
    <header id="home" className="m-hero">
      <div className="m-avatar">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          width={200}
          height={200}
          priority
        />
      </div>
      <h1 className="m-h1">
        {hero.headline}
        {/* Literal spaces, not CSS margin: the separator is part of the text
            content crawlers and screen readers read, and JSX drops the
            whitespace-only lines around this span. */}
        <span className="m-h1-sep">{" | "}</span>
        {hero.name}
      </h1>
      <div className="m-lede">
        <p>{hero.description}</p>
      </div>
      {/* Primary CTA points at /services, not mailto: someone who does not yet
          know the price or the timeline is not ready to write an email. */}
      <div className="m-cta-row">
        <Link href="/services" className="m-btn primary">
          What I can build for you
        </Link>
        <Link href={`mailto:${EMAIL}`} className="m-btn ghost">
          Email me
        </Link>
      </div>
      <div className="m-status">
        <span className="m-dot"></span>
        <span>{hero.status}</span>
      </div>
    </header>
  );
}
