"use client";

import WorkCard from "./workCard";
import { usePathname } from "next/navigation";

export default function Portfolios({ blok, show }: { blok: any; show?: any }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4">
      {pathname == "/" && (
        <div className="flex justify-between">
          <h2 className="text-3xl">Recent Works</h2>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {blok.items
          .filter((item: any) => !item.hide)
          .map((item: any, key: number) => {
            return <WorkCard key={key} work={item} />;
          })}
      </div>
    </div>
  );
}
