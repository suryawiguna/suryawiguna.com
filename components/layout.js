import Navigation from "./navigation";
import Head from "next/head";

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="lg:container mx-auto lg:px-14">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Navigation />
          <main className="w-full sm:w-4/5 lg:w-4/6 order-first sm:order-last mb-20 p-4 px-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
