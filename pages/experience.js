export default function Experience({ data }) {
  const { experience } = data;
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-3xl">{experience.title}</h1>
      <ol className="relative border-l border-gray-300">
        {experience.histories.map((item, key) => {
          return (
            <li
              key={key}
              className={`${
                key < experience.histories.length - 1 && "mb-12"
              } ml-4`}
            >
              <div
                className={`absolute w-3 h-3 bg-gray-${
                  item.year.includes("now") ? "900" : "400"
                } rounded-full mt-2 -left-1.5 border border-white`}
              />
              <time className="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
                {item.year}
              </time>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mb-4 text-sm font-normal text-gray-600">
                {item.description}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export async function getStaticProps() {
  const data = require("/data/data.json");

  return {
    props: {
      data: data,
    },
  };
}
