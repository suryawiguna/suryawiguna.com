import Image from "next/image";
import Link from "next/link";

export default function Links({ blok }) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-center md:justify-start gap-2 overflow-auto">
        {blok.links
          .filter((link) => link.socialLink)
          .map((link, key) => (
            <Link
              key={key}
              href={link.link.url || link.link.cached_url}
              target={`${link.linktype == "url" ? "_blank" : ""}`}
              className="flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-600 hover:scale-[0.95] rounded-full transition-transform p-2"
            >
              <i className={`bx ${link.icon} dark:text-zinc-100 text-2xl`}></i>
            </Link>
          ))}
      </div>
      <div className="flex flex-col items-stretch self-center md:self-start gap-5">
        {blok.links
          .filter((link) => !link.socialLink)
          .map((link, key) => {
            return (
              <Link
                key={key}
                href={link.link.url || link.link.cached_url}
                target={`${link.linktype == "url" ? "_blank" : ""}`}
                className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 hover:scale-[0.98] transition-transform py-4 px-5 text-center gap-2 rounded-full max-w-md"
              >
                {link.name}
              </Link>
            );
          })}
        <div className="relative h-12">
          <Link href="https://www.buymeacoffee.com/suryawiguna" target="_blank">
            <Image
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              fill
              alt="Buy Me A Coffee"
              className="text-sm object-contain object-center md:object-left"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
