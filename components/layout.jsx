import Head from "next/head";
import Navigation from "./navigation";

export default function Layout({ data, navigation, children }) {
  return (
    <>
      <Head>
        <title>{`${data.title} - Surya Wiguna`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:title"
          content={`${data.seo.title} - Surya Wiguna`}
          key="title"
        />
        <meta
          property="og:description"
          content={data.seo.description}
          key="description"
        />
        <meta property="og:image" content={data.seo.og_image} />
      </Head>
      <div className="lg:container mx-auto lg:px-14">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Navigation navigation={navigation} />
          <main className="w-full sm:w-8/12 lg:w-9/12 xl:w-10/12 order-first sm:order-last mb-20 p-6 px-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
