"use client";
import Image from "next/image";
import { RichText } from "../global";

export default function Introduction({ blok }) {
  return (
    <section className="flex flex-col items-center">
      <Image
        src={blok.image.filename}
        alt={blok.image.alt}
        width={84}
        height={84}
        placeholder="blur"
        blurDataURL={`${blok.image.filename}/m/40x40`}
        className="rounded-full h-16 w-16"
      />
      <RichText
        data={blok.description}
        className="text-lg text-center mt-2 ml-3"
      />
    </section>
  );
}
