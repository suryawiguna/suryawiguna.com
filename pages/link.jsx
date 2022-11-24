import { DynamicComponent } from "../components/global";
import Layout from "../components/layout";
import { getNavigation, getPage } from "../lib/api";
import * as components from "../components/link";

export default function Link({ data, navigation }) {
  return (
    <Layout data={data} navigation={navigation}>
      <div className="flex flex-col gap-6">
        <DynamicComponent bloks={data.body} components={components} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = (await getPage("link")) || [];
  const navigation = (await getNavigation()) || [];

  return {
    props: {
      data: data,
      navigation: navigation,
    },
  };
}
