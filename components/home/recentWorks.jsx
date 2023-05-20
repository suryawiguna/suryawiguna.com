import WorkCard from "../portfolio/workCard";
import Link from "next/link";

export default function RecentWorks({ blok }) {
  return (
    <div className="mt-8 flex flex-col gap-6">
      <h2 className="text-xl font-bold">{blok.title}</h2>
      <div className="grid grid-cols sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blok.items.map((work, key) => {
          return <WorkCard key={key} work={work} />;
        })}
        <Link href="/portfolio" passHref>
          <a
            href=""
            rel="noreferrer"
            className="relative h-32 self-center rounded-2xl bg-zinc-100 dark:bg-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700 flex justify-center items-center text-zinc-500"
          >
            See more
            <i className="bx bx-right-arrow-alt text-2xl" />
          </a>
        </Link>
      </div>
    </div>
  );
}
