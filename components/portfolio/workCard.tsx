"use client";

import Link from "next/link";
import Image from "next/image";

export default function WorkCard({ work, setPortfolio }) {
  return (
    <Link
      key={work._uid}
      onClick={(e) => {
        e.preventDefault();
        setPortfolio(work);
        // @ts-expect-error
        document.getElementById("my_modal_1").showModal();
      }}
      href={""}
      passHref
      aria-label={`portfolio-${work._uid}`}
      className="relative h-32 hover:scale-[0.98] transition-transform"
    >
      <Image
        src={work.image.filename}
        fill
        sizes="100vw"
        alt=""
        placeholder="blur"
        blurDataURL={`${work.image.filename}/m/40x40`}
        className="rounded-2xl"
        style={{ objectFit: "cover" }}
      />
    </Link>
  );
}
