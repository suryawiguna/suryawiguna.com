import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import { getNavigation } from "../lib/api";

export default function Link({ data, navigation }) {
  const { link } = data;
  return (
    <Layout navigation={navigation}>
      <Head>
        <title>{`${link.title} - Surya Wiguna`}</title>
      </Head>
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <Image
            src={link.profile_img}
            alt=""
            width={60}
            height={60}
            placeholder="blur"
            blurDataURL={link.profile_img}
            className="rounded-full"
          />
          <h2 className="text-lg font-semibold ml-3">{link.name}</h2>
        </div>
        <div className="flex flex-col gap-5">
          {link.links.map((link, key) => {
            return (
              <a
                key={key}
                href={link.link}
                target="_blank"
                rel="noreferrer"
                className="bg-gray-100 hover:bg-gray-200 py-3 px-5 flex items-center gap-2 rounded-full max-w-md"
              >
                <span className="flex justify-center items-center gap-2">
                  <Image
                    src={link.image}
                    alt=""
                    width={18}
                    height={18}
                    placeholder="blur"
                    blurDataURL={link.image}
                    className="w-[24px] h-[24px]"
                  />
                  <span className="flex-1">{link.text}</span>
                </span>
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
