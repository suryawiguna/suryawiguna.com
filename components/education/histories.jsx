export default function Histories({ blok }) {
  return (
    <ol className="relative border-l border-gray-300">
      {blok.histories.map((item, key) => {
        return (
          <li
            key={key}
            className={`${key < blok.histories.length - 1 && "mb-12"} ml-4`}
          >
            <div
              className={`absolute w-5 h-5 bg-gray-300 rounded-full mt-1 -left-2.5 border-4 border-white`}
            />
            <time className="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
              {item.periode}
            </time>
            <a href={item.link} target="_blank" rel="noreferrer">
              <h3 className="text-lg font-semibold mr-2">
                {item.title}
                {item.link && <i className="bx bx-link-external ml-1" />}
              </h3>
            </a>
            <p className="mb-4 text-sm font-normal text-gray-600">
              {item.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
