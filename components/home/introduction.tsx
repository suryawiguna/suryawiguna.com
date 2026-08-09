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
        <span className="m-h1-sep">—</span>
        {hero.name}
      </h1>
      <div className="m-lede">
        <p>{hero.description}</p>
      </div>
      <div className="m-cta-row">
        <Link href={`mailto:${EMAIL}`} className="m-btn primary">
          Email me
        </Link>
        <Link href="#portfolio" className="m-btn ghost">
          See work
        </Link>
      </div>
      <div className="m-status">
        <span className="m-dot"></span>
        <span>{hero.status}</span>
      </div>
    </header>
  );
}
