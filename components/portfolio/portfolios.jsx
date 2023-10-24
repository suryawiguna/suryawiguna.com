"use client";

import WorkCard from "./workCard";

export default function Portfolios({ blok }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">Recent Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {blok.items.map((item, key) => {
          return <WorkCard key={key} work={item} />;
        })}
      </div>
    </div>
  );
}
