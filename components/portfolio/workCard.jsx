import Link from "next/link";
import Image from "next/image";

export default function WorkCard({ work }) {
  return (
    <Link key={work._uid} href={work.link.url} passHref>
      <a
        href=""
        target="_blank"
        rel="noreferrer"
        className="relative h-32 hover:scale-[0.98] transition-transform"
      >
        <Image
          src={work.image.filename}
          layout="fill"
          objectFit="cover"
          alt=""
          placeholder="blur"
          blurDataURL={`${work.image.filename}/m/40x40`}
          className="rounded-2xl"
        />
      </a>
    </Link>
  );
}
