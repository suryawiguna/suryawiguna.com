"use client";

import { RichText } from "components/global";
import Image from "next/image";
import Link from "next/link";

export default function WorkCard({ work }: { work: any }) {
  return (
    <div key={work._uid} className="rounded-xl flex flex-col gap-3">
      <Image
        src={work.image.filename}
        alt={work.image.alt}
        width={400}
        height={200}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={`${work.image.filename}/m/40x40`}
        className="w-screen"
      />
      <Link href={work.link.url} passHref target="_blank">
        <h3 className="text-2xl">{work.title}</h3>
      </Link>
      <div className="flex gap-1">
        {work.category.map((c: string, k: number) => {
          return (
            <small
              key={k}
              className="text-xs text-gray-400 bg-gray-100 p-1 px-2 rounded"
            >
              {c}
            </small>
          );
        })}
      </div>
      <RichText
        data={work.description}
        className="leading-relaxed text-gray-500"
      />
    </div>
  );
}
