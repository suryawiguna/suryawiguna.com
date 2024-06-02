import Image from "next/image";
import RichText from "../global/richText";
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

export default function Introduction({ blok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="flex flex-col items-start gap-4"
    >
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
      <Link
        href={"mailto:hi@suryawiguna.com"}
        className="bg-amber-600 dark:bg-amber-700 text-white rounded py-1 px-3"
      >
        Email me
      </Link>
    </section>
  );
}
