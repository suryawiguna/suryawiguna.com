"use client";

import Image from "next/image";
import RichText from "../global/richText";
import { storyblokEditable } from "@storyblok/react";

export default function Introduction({ blok }) {
  return (
    <section {...storyblokEditable(blok)}>
      <Image
        src={blok.image.filename}
        alt=""
        width={120}
        height={120}
        placeholder="blur"
        blurDataURL={`${blok.image.filename}/m/40x40`}
        className="rounded-full mb-2 w-auto h-auto"
      />
      <RichText data={blok.description} />
    </section>
  );
}
