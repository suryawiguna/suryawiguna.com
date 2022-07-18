import "../styles/global.css";
import "../styles/nprogress.css";
import Head from "next/head";
import Layout from "../components/layout";
import dynamic from "next/dynamic";

const TopProgressBar = dynamic(
  () => {
    return import("../components/topProgressBar");
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" />
      </Head>
      <TopProgressBar />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
