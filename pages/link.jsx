import Head from "next/head";
import Image from "next/image";

export default function Link({ data }) {
  const { link } = data;
  return (
    <>
      <Head>
        <title>{`${link.title} - Surya Wiguna`}</title>
      </Head>
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <Image
            src={link.profile_img}
            alt=""
            width={60}
            height={60}
            placeholder="blur"
            blurDataURL={link.profile_img}
            className="rounded-full"
          />
          <h2 className="text-lg font-semibold ml-3">{link.name}</h2>
        </div>
        <div className="flex flex-col gap-5">
          {link.links.map((link, key) => {
            return (
              <a
                key={key}
                href={link.link}
                target="_blank"
                rel="noreferrer"
                className="bg-white py-3 px-5 flex items-center gap-2 rounded-full border border-black scale-100 hover:scale-105 active:scale-105 max-w-md"
              >
                <>
                  <Image
                    src={link.image}
                    alt=""
                    width={24}
                    height={24}
                    placeholder="blur"
                    blurDataURL={link.image}
                    className="w-[24px] h-[24px]"
                  />
                  <span className="flex-1">{link.text}</span>
                </>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const data = require("/data/data.json");

  return {
    props: {
      data: data,
    },
  };
}
