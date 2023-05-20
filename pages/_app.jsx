import "../styles/global.css";
import "../styles/nprogress.css";
import Head from "next/head";
import dynamic from "next/dynamic";
import "boxicons/css/boxicons.min.css";

import * as ga from "../lib/ga";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { storyblokInit, apiPlugin } from "@storyblok/react";
import { ThemeProvider } from "next-themes";

const token = process.env.STORYBLOK_ACCESS_TOKEN;

storyblokInit({
  accessToken: token,
  use: [apiPlugin],
});

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
    <ThemeProvider attribute="class">
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" />
      </Head>
      <TopProgressBar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
