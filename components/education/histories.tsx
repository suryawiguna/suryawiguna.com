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
              className={`absolute w-5 h-5 bg-zinc-300 dark:bg-zinc-500 rounded-lg mt-1 -left-2.5 border-4 border-white dark:border-zinc-900`}
            />
            <time className="mb-1 text-xs font-normal leading-none text-zinc-400 dark:text-zinc-500">
              {item.periode}
            </time>
            {item.link !== undefined ? (
              <a href={item.link.url} target="_blank" rel="noreferrer">
                <h3 className="text-lg font-semibold mr-2">
                  {item.title}
                  <i className="bx bx-link-external ml-1" />
                </h3>
              </a>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mr-2">{item.title}</h3>
              </div>
            )}
            <p className="mb-4 text-sm font-normal text-zinc-600">
              {item.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
