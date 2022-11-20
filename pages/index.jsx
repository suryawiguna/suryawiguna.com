import Head from "next/head";
import Layout from "../components/layout";
import * as components from "../components/home";
import { getHome, getNavigation } from "../lib/api";
import { DynamicComponent } from "../components/global";

export default function Index({ data, navigation }) {
  return (
    <Layout navigation={navigation}>
      <Head>
        <title>{`${data.title} - Surya Wiguna`}</title>
      </Head>
      <div className="flex flex-col items-start gap-6">
        <h1 className="font-bold text-3xl">{data.title}</h1>
        <DynamicComponent bloks={data.body} components={components} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = (await getHome()) || [];
  const navigation = (await getNavigation()) || [];

  return {
    props: {
      data: data,
      navigation: navigation,
    },
    revalidate: 360,
  };
}
