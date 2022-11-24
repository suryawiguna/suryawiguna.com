import Layout from "../components/layout";
import { getNavigation, getPage } from "../lib/api";
import * as components from "../components/experience";
import { DynamicComponent } from "../components/global";

export default function Experience({ data, navigation }) {
  return (
    <Layout data={data} navigation={navigation}>
      <div className="flex flex-col gap-8">
        <h1 className="font-bold text-3xl">{data.title}</h1>
        <DynamicComponent bloks={data.body} components={components} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = (await getPage("experience")) || [];
  const navigation = (await getNavigation()) || [];

  return {
    props: {
      data: data,
      navigation: navigation,
    },
  };
}
