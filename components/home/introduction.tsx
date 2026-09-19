import Image from "next/image";
import Link from "next/link";
import { hero } from "content/home";

export default function Introduction() {
  return (
    <header id="home" className="m-hero m-home-hero">
      <div className="m-avatar">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          width={200}
          height={200}
          priority
        />
      </div>
      <p className="m-eyebrow">{hero.identity}</p>
      <h1 className="m-h1 m-h1-wide">{hero.headline}</h1>
      <div className="m-lede">
        <p>{hero.description}</p>
      </div>
      <div className="m-cta-row">
        <Link href="/portfolio" className="m-btn primary">
          See my work
        </Link>
        <Link href="/services#contact" className="m-btn ghost">
          Start a project
        </Link>
      </div>
      <div className="m-status">
        <span className="m-dot"></span>
        <span>{hero.status}</span>
      </div>
    </header>
  );
}
