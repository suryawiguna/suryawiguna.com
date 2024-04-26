"use client";

import Link from "next/link";
import WorkCard from "./workCard";

import { useState } from "react";
import Image from "next/image";
import { RichText } from "components/global";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Modal = dynamic(() => import("../../components/global/modal"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Portfolios({ blok, show }: { blok: any; show?: any }) {
  const [portfolio, setPortfolio] = useState(blok.items[0]);
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6">
      {pathname == "/" && (
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Recent Works</h2>
        </div>
      )}

      <div className="columns sm:columns-2 md:columns-3">
        <div className="relative mb-4 before:content-['']">
          {blok.items.map((item, key) => {
            return (
              <WorkCard key={key} work={item} setPortfolio={setPortfolio} />
            );
          })}
        </div>
      </div>

      <Modal>
        <div className=" grid gap-2">
          <h3 className="text-2xl font-bold">{portfolio.title}</h3>
          <div className="flex gap-2">
            {portfolio.category.map((c: string, k: number) => {
              return (
                <small
                  key={k}
                  className="text-xs text-zinc-400 bg-gray-100 dark:text-zinc-400 dark:bg-zinc-700 py-1 px-2 rounded"
                >
                  {c}
                </small>
              );
            })}
          </div>
        </div>
        <Image
          src={portfolio.image.filename}
          alt=""
          width={400}
          height={200}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={`${portfolio.image.filename}/m/40x40`}
          className="w-screen rounded-lg"
        />
        <RichText data={portfolio.description} />
        <Link
          href={portfolio.link.url}
          passHref
          target="_blank"
          className="flex items-center justify-center py-2 hover:scale-[0.99] transition-transform text-zinc-50 bg-zinc-600 hover:bg-zinc-200 dark:bg-zinc-300 dark:text-zinc-800 rounded-lg"
        >
          <span>View</span>
          <i className="bx bx-link-external text-lg ml-1" />
        </Link>
      </Modal>
    </div>
  );
}
