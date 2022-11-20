import Head from "next/head";
import Layout from "../components/layout";
import { getNavigation } from "../lib/api";

export default function Experience({ data, navigation }) {
  const { experience } = data;
  return (
    <Layout navigation={navigation}>
      <Head>
        <title>{`${experience.title} - Surya Wiguna`}</title>
      </Head>
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
                  className={`absolute w-5 h-5 ${
                    item.year.includes("now") ? "bg-gray-900" : "bg-gray-300"
                  } rounded-full mt-1 -left-2.5 border-4 border-white`}
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
    </Layout>
  );
}

export async function getStaticProps() {
  const data = require("/data/data.json");
  const navigation = (await getNavigation()) || [];

  return {
    props: {
      data: data,
      navigation: navigation,
    },
  };
}
