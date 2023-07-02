import Layout from "../components/layout";
import * as components from "../components/home";
import { getHome, getNavigation } from "../lib/api";
import { DynamicComponent } from "../components/global";
import SubscribeForm from "../components/blog/subscribe";

export default function Index({ data, navigation }) {
  return (
    <Layout data={data} navigation={navigation}>
      <div className="flex flex-col items-stretch gap-6">
        <h1 className="font-bold text-3xl">{data.title}</h1>
        <DynamicComponent bloks={data.body} components={components} />
        <div className="flex flex-col mt-8">
          <h2 className="text-xl font-bold mb-6">Subscribe to my blog</h2>
          <SubscribeForm />
        </div>
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
    revalidate: 10,
  };
}
