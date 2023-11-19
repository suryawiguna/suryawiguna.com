"use client";

import Link from "next/link";
import WorkCard from "./workCard";

import { useState } from "react";
import Image from "next/image";
import { RichText } from "components/global";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("../../components/global/modal"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Portfolios({ blok, show }: { blok: any; show?: any }) {
  const [portfolio, setPortfolio] = useState(blok.items[0]);

  return (
    <div className="flex flex-col gap-6">
      {show && show.title && (
        <h2 className="text-xl font-bold">Recent Works</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {blok.items.map((item, key) => {
          return <WorkCard key={key} work={item} setPortfolio={setPortfolio} />;
        })}
        {show && show.seeMore && (
          <Link
            href="/portfolio"
            className="flex items-center justify-center h-32 hover:scale-[0.98] transition-transform bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700
dark:text-zinc-300 rounded-xl"
          >
            <span>Other portfolio</span>
            <i className="bx bx-right-arrow-alt text-2xl" />
          </Link>
        )}
      </div>

      <Modal>
        <div>
          <h3 className="text-xl font-bold">{portfolio.title}</h3>
          <small className="text-sm italic text-amber-500">
            {portfolio.category}
          </small>
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
          className="flex items-center justify-center py-2 hover:scale-[0.98] transition-transform bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700
dark:text-zinc-300 rounded-xl"
        >
          <span>View</span>
          <i className="bx bx-link-external text-lg ml-1" />
        </Link>
      </Modal>
    </div>
  );
}
