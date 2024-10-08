"use client";

import WorkCard from "../portfolio/workCard";
import Link from "next/link";

export default function RecentWorks({ blok }) {
  return (
    <div className="mt-8 flex flex-col gap-6">
      <h2 className="text-xl">{blok.title}</h2>
      <div className="grid grid-cols sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blok.items.map((work, key) => {
          return <WorkCard key={key} work={work} />;
        })}
        <Link
          href="/portfolio"
          passHref
          className="relative h-32 self-center rounded-lg bg-zinc-100 hover:scale-[0.99] transition-transform flex justify-center items-center text-zinc-500"
        >
          See more
          <i className="bx bx-right-arrow-alt text-2xl" />
        </Link>
      </div>
    </div>
  );
}
