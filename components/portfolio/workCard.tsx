"use client";

import { RichText } from "components/global";
import Image from "next/image";
import Link from "next/link";

export default function WorkCard({ work }: { work: any }) {
  return (
    <div
      key={work._uid}
      className="rounded-xl bg-zinc-100 dark:bg-zinc-700 p-4 flex flex-col gap-2"
    >
      <Image
        src={work.image.filename}
        alt=""
        width={400}
        height={200}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={`${work.image.filename}/m/40x40`}
        className="w-screen rounded-lg"
      />
      <h3 className="text-2xl mb-1">{work.title}</h3>
      <div className="flex gap-2">
        {work.category.map((c: string, k: number) => {
          return (
            <small
              key={k}
              className="text-xs text-amber-700 dark:text-amber-400 font-light"
            >
              #{c}
            </small>
          );
        })}
      </div>
      <RichText data={work.description} className="text-sm" />
      <Link
        href={work.link.url}
        passHref
        target="_blank"
        className="flex items-center self-start justify-center mt-2 py-2 px-5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-500 dark:text-zinc-200 dark:hover:bg-zinc-600 rounded-lg"
      >
        <span>View</span>
        <i className="bx bx-link-external text-sm ml-1" />
      </Link>
    </div>
  );
}
