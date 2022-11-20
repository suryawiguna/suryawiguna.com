import Link from "next/link";
import Image from "next/image";

export default function RecentWorks({ blok }) {
  return (
    <div className="mt-8 flex flex-col gap-6">
      <h2 className="text-xl font-bold">{blok.title}</h2>
      <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blok.items.map((work, key) => {
          return (
            <Link key={key} href={work.link.url} passHref>
              <a
                href=""
                className="opacity-80 hover:opacity-100"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={work.image.filename}
                  width={284}
                  height={180}
                  alt=""
                  placeholder="blur"
                  blurDataURL={`${work.image.filename}/m/40x40`}
                  className="rounded-lg"
                />
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
