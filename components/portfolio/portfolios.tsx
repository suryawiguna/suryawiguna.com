"use client";

import Link from "next/link";
import WorkCard from "./workCard";

export default function Portfolios({ blok, show }: { blok: any; show?: any }) {
  return (
    <div className="flex flex-col gap-6">
      {show && show.title && (
        <h2 className="text-xl font-bold">Recent Works</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {blok.items.map((item, key) => {
          return <WorkCard key={key} work={item} />;
        })}
        {show && show.seeMore && (
          <Link
            href="/portfolio"
            className="flex items-center justify-center h-32 hover:scale-[0.98] transition-transform bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700
dark:text-zinc-300 rounded-2xl"
          >
            <span>See more</span>
            <i className="bx bx-right-arrow-alt text-2xl" />
          </Link>
        )}
      </div>
    </div>
  );
}
