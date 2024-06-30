"use client";

import WorkCard from "./workCard";
import { usePathname } from "next/navigation";

export default function Portfolios({ blok, show }: { blok: any; show?: any }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6">
      {pathname == "/" && (
        <div className="flex justify-between">
          <h2 className="text-3xl">Recent Works</h2>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {blok.items.map((item, key) => {
          return <WorkCard key={key} work={item} />;
        })}
      </div>
    </div>
  );
}
