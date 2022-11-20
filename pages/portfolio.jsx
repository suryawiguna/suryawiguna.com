import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import { getNavigation } from "../lib/api";

export default function Portfolio({ data, navigation }) {
  const { portfolio } = data;
  return (
    <Layout navigation={navigation}>
      <Head>
        <title>{`${portfolio.title} - Surya Wiguna`}</title>
      </Head>
      <div className="flex flex-col gap-8">
        <h1 className="font-bold text-3xl">{portfolio.title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {portfolio.images.map((image, key) => {
            return (
              <a
                key={key}
                href={image.link}
                className="relative drop-shadow-lg opacity-80 hover:opacity-100 min-h-[140px]"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={image.src}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  objectPosition="start"
                  className="overflow-hidden rounded-lg"
                  placeholder="blur"
                  blurDataURL={image.src}
                />
              </a>
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
