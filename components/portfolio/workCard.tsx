"use client";

import Link from "next/link";
import Image from "next/image";

export default function WorkCard({
  work,
  setPortfolio,
}: {
  work: any;
  setPortfolio?: any;
}) {
  return (
    <Link
      key={work._uid}
      onClick={(e) => {
        e.preventDefault();
        setPortfolio(work);
        // @ts-expect-error
        document.getElementById("portfolio-modal").showModal();
      }}
      href={work.link.url}
      passHref
      target="_blank"
      aria-label={`portfolio-${work._uid}`}
      className="hover:scale-[0.99] transition-transform"
    >
      <Image
        src={work.image.filename}
        sizes="100vw"
        alt=""
        placeholder="blur"
        blurDataURL={`${work.image.filename}/m/40x40`}
        className="rounded-lg w-full my-4 first:mt-0"
        width={600}
        height={600}
      />
    </Link>
  );
}
