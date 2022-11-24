import { DynamicComponent } from "../components/global";
import Layout from "../components/layout";
import { getNavigation, getPage } from "../lib/api";
import * as components from "../components/skill";

export default function Skill({ data, navigation }) {
  return (
    <Layout data={data} navigation={navigation}>
      <div className="flex flex-col items-center sm:items-start gap-8">
        <h1 className="font-bold text-3xl self-start">{data.title}</h1>
        <DynamicComponent bloks={data.body} components={components} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = (await getPage("skill")) || [];
  const navigation = (await getNavigation()) || [];

  return {
    props: {
      data: data,
      navigation: navigation,
    },
  };
}
