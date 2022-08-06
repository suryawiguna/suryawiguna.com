import Head from "next/head";

export default function Education({ data }) {
  const { education } = data;
  return (
    <>
      <Head>
        <title>{`${education.title} - Surya Wiguna`}</title>
      </Head>
      <div className="flex flex-col gap-8">
        <h1 className="font-bold text-3xl">{education.title}</h1>
        <ol className="relative border-l border-gray-300">
          {education.histories.map((item, key) => {
            return (
              <li
                key={key}
                className={`${
                  key < education.histories.length - 1 && "mb-12"
                } ml-4`}
              >
                <div
                  className={`absolute w-5 h-5 bg-gray-300 rounded-full mt-1 -left-2.5 border-4 border-white`}
                />
                <time className="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
                  {item.year}
                </time>
                <a href={item.link} target="_blank" rel="noreferrer">
                  <h3 className="text-base font-semibold">{item.name}</h3>
                </a>
                <p className="mb-4 text-sm font-normal text-gray-600">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </>
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
