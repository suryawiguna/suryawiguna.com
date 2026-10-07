import Image from "next/image";
import { linkIntro } from "content/links";

// Same left masthead as the home page: avatar beside the name, then a lede.
export default function Introduction() {
  return (
    <header className="m-hero m-hero-left m-home-hero">
      <div className="m-masthead">
        <div className="m-avatar">
          <Image
            src={linkIntro.image.src}
            alt={linkIntro.image.alt}
            width={88}
            height={88}
            priority
          />
        </div>
        <h1 className="m-masthead-name">{linkIntro.name}</h1>
      </div>
      <p className="m-lede">{linkIntro.description}</p>
    </header>
  );
}
