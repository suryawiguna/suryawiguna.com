import "../styles/global.css";
import "../styles/nprogress.css";
import Head from "next/head";
import Layout from "../components/layout";
import dynamic from "next/dynamic";

import * as ga from "../lib/ga";
import { useEffect } from "react";
import { useRouter } from "next/router";

const TopProgressBar = dynamic(
  () => {
    return import("../components/topProgressBar");
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
