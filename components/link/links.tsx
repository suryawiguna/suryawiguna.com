import Link from "next/link";

export default function Links({ blok }) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-center gap-2 overflow-auto">
        {blok.links
          .filter((link) => link.socialLink)
          .map((link, key) => (
            <Link
              key={key}
              href={link.link.url || link.link.cached_url}
              target={`${link.linktype == "url" ? "_blank" : ""}`}
              className="flex items-center bg-zinc-200 hover:bg-zinc-100 rounded-full py-1 px-3 text-sm"
            >
              <p>{link.name}</p>
            </Link>
          ))}
      </div>
      <div className="flex flex-col items-stretch self-center gap-5">
        {blok.links
          .filter((link) => !link.socialLink)
          .map((link, key) => {
            return (
              <Link
                key={key}
                href={link.link.url || link.link.cached_url}
                target={`${link.linktype == "url" ? "_blank" : ""}`}
                className="bg-zinc-200 hover:bg-zinc-100 text-zinc-800 transition-transform py-4 px-5 text-center gap-2 rounded-lg max-w-md"
              >
                {link.name}
              </Link>
            );
          })}
      </div>
    </section>
  );
}
