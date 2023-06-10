import Image from "next/image";

export default function Links({ blok }) {
  return (
    <section className="flex flex-col gap-5">
      {blok.links.map((link, key) => {
        return (
          <a
            key={key}
            href={link.link.url}
            target="_blank"
            rel="noreferrer"
            className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 hover:scale-95 transition-transform  py-3 px-5 flex items-center gap-2 rounded-full max-w-md"
          >
            <span className="flex justify-center items-center gap-2">
              <Image
                src={link.icon.filename}
                alt=""
                width={20}
                height={20}
                placeholder="blur"
                blurDataURL={`${link.icon.filename}/m/40x40`}
                className="w-[24px] h-[24px]"
              />
              <span className="flex-1">{link.name}</span>
            </span>
          </a>
        );
      })}
    </section>
  );
}
