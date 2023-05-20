import Head from "next/head";
import Navigation from "./navigation";

export default function Layout({ data, navigation, children }) {
  return (
    <>
      {data && (
        <Head>
          <title>{`${data.title} - Surya Wiguna`}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
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
      )}
      <div className="lg:container h-full mx-auto lg:px-10 2xl:px-52 dark:bg-zinc-900 dark:text-zinc-300">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Navigation navigation={navigation} />
          <main className="w-full md:w-8/12 lg:w-9/12 xl:w-10/12 order-first md:order-last mb-20 p-6 px-6 mt-16 md:mt-0 dark:bg-zinc-900 dark:text-zinc-300">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
