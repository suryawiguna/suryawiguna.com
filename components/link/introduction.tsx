import Image from "next/image";
import { linkIntro } from "content/links";

// Photo on the left; name and bio stacked beside it, sized so the two lines
// together are the photo's height. On a phone the bio drops under both.
export default function Introduction() {
  return (
    <header className="m-hero m-hero-left m-home-hero">
      <div className="m-profile">
        <div className="m-avatar">
          <Image
            src={linkIntro.image.src}
            alt={linkIntro.image.alt}
            width={152}
            height={152}
            priority
          />
        </div>
        <h1 className="m-profile-name">{linkIntro.name}</h1>
        <p className="m-profile-bio">{linkIntro.description}</p>
      </div>
    </header>
  );
}
