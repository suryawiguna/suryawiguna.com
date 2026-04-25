import Image from "next/image";
import RichText from "../global/richText";
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

export default function Introduction({ blok }) {
  return (
    <header
      {...storyblokEditable(blok)}
      id="home"
      className="m-hero"
    >
      <div className="m-avatar">
        <Image
          src={blok.image.filename}
          alt={blok.image.alt}
          width={200}
          height={200}
          priority
        />
      </div>
      <h1 className="m-h1">
        Freelance Web Developer in Bali
        <span className="m-h1-sep">—</span>
        Surya Wiguna
      </h1>
      <div className="m-lede">
        <RichText data={blok.description} />
      </div>
      <div className="m-cta-row">
        <Link href="mailto:hi@suryawiguna.com" className="m-btn primary">
          Email me
        </Link>
        <Link href="#portfolio" className="m-btn ghost">
          See work
        </Link>
      </div>
      <div className="m-status">
        <span className="m-dot"></span>
        <span>Available for new projects</span>
      </div>
    </header>
  );
}
