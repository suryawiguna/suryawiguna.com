import Image from "next/image";

export default function Portfolios({ blok }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      {blok.items.map((item, key) => {
        return (
          <a
            key={key}
            href={item.link.url}
            className="relative drop-shadow-lg opacity-80 hover:opacity-100 min-h-[140px]"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={item.image.filename}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="start"
              className="overflow-hidden rounded-lg"
              placeholder="blur"
              blurDataURL={`${item.image.filename}/m/40x40`}
            />
          </a>
        );
      })}
    </div>
  );
}
