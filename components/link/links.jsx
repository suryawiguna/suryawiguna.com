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
            className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 hover:scale-[0.98] transition-transform py-4 px-5 text-center gap-2 rounded-full max-w-md"
          >
            {link.name}
          </a>
        );
      })}
    </section>
  );
}
