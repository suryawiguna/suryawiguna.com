import Image from "next/image";
import RichText from "../global/richText";
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

export default function Introduction({ blok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8"
    >
      <Image
        src={blok.image.filename}
        alt=""
        width={80}
        height={80}
        placeholder="blur"
        blurDataURL={`${blok.image.filename}/m/40x40`}
        className="rounded-full w-auto h-auto"
      />
      <div className="gap-2 flex flex-col justify-start items-start">
        <RichText data={blok.description} />
        <Link
          href={"mailto:hi@suryawiguna.com"}
          className="bg-amber-600 dark:bg-amber-700 text-white self-start rounded py-2 px-4"
        >
          Email me
        </Link>
      </div>
    </section>
  );
}
