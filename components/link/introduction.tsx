import Image from "next/image";
import { linkIntro } from "content/links";

export default function Introduction() {
  return (
    <header className="m-hero">
      <div className="m-avatar">
        <Image
          src={linkIntro.image.src}
          alt={linkIntro.image.alt}
          width={200}
          height={200}
          placeholder="blur"
          blurDataURL={`${linkIntro.image.src}/m/40x40`}
        />
      </div>
      <div className="m-lede">
        <p>{linkIntro.description}</p>
      </div>
    </header>
  );
}
