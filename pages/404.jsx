import Layout from "../components/layout";
import { getNavigation } from "../lib/api";

export default function Custom404({ navigation }) {
  return (
    <Layout navigation={navigation}>
      <h1 className="font-bold text-3xl">404 - Page Not Found</h1>
    </Layout>
  );
}

export async function getStaticProps() {
  const navigation = (await getNavigation()) || [];

  return {
    props: {
      navigation: navigation,
    },
    revalidate: 10,
  };
}
