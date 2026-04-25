"use client";

import WorkCard from "./workCard";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Portfolios({ blok, show }: { blok: any; show?: any }) {
  const pathname = usePathname();
  const isHome = pathname == "/";

  return (
    <section id="portfolio" className={isHome ? "m-section" : ""}>
      {isHome && <h2 className="m-h2">Recent Works</h2>}
      <ul className="m-work-list">
        {blok.items
          .filter((item: any) => !item.hide)
          .map((item: any, key: number) => (
            <WorkCard key={key} work={item} />
          ))}
      </ul>
      {isHome && (
        <Link href="/portfolio" className="m-more">
          All projects →
        </Link>
      )}
    </section>
  );
}
