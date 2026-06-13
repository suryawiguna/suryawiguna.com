"use client";
import Image from "next/image";
import { RichText } from "../global";
import { blurThumb } from "lib/helper";

export default function Introduction({ blok }) {
  return (
    <header className="m-hero">
      <div className="m-avatar">
        <Image
          src={blok.image.filename}
          alt={blok.image.alt}
          width={200}
          height={200}
          placeholder="blur"
          blurDataURL={blurThumb(blok.image.filename)}
        />
      </div>
      <div className="m-lede">
        <RichText data={blok.description} />
      </div>
    </header>
  );
}
