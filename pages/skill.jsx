import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import { getNavigation } from "../lib/api";

export default function Skill({ data, navigation }) {
  const { skill } = data;
  return (
    <Layout navigation={navigation}>
      <Head>
        <title>{`${skill.title} - Surya Wiguna`}</title>
      </Head>
      <div className="flex flex-col items-center sm:items-start gap-8">
        <h1 className="font-bold text-3xl self-start">{skill.title}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6">
          {skill.items.map((item, key) => {
            return (
              <div
                key={key}
                className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg"
              >
                <div className="relative min-h-[60px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL={item.image}
                  />
                </div>
                <h3 className="text-center self-center text-sm md:text-base">
                  {item.name}
                </h3>
              </div>
            );
          })}
        </div>
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
