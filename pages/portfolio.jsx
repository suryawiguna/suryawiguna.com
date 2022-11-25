import { DynamicComponent } from "../components/global";
import Layout from "../components/layout";
import { getNavigation, getPage } from "../lib/api";
import * as components from "../components/portfolio";

export default function Portfolio({ data, navigation }) {
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
  const data = (await getPage("portfolio")) || [];
  const navigation = (await getNavigation()) || [];

  return {
    props: {
      data: data,
      navigation: navigation,
    },
    revalidate: 10,
  };
}
