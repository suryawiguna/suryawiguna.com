export default function Histories({ blok }) {
  return (
    <ol className="relative border-l border-zinc-300 dark:border-zinc-500">
      {blok.histories.map((item, key) => {
        return (
          <li
            key={key}
            className={`${key < blok.histories.length - 1 && "mb-12"} ml-4`}
          >
            <div
              className={`absolute w-5 h-5 ${
                item.periode.includes("now")
                  ? "bg-amber-600 dark:bg-amber-800"
                  : "bg-zinc-300 dark:bg-zinc-500"
              } rounded-full mt-1 -left-2.5 border-4 border-white dark:border-zinc-900`}
            />
            <div className="grid">
              <time className="mb-1 text-xs font-normal leading-none text-zinc-400">
                {item.periode}
              </time>
              <h3 className="text-lg">{item.title}</h3>
              <p className="mb-4 text-sm font-normal text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
