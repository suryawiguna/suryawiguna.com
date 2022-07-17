import Image from "next/image";
import Head from "next/head";

export default function Portfolio({ data }) {
  const { portfolio } = data;
  return (
    <>
      <Head>
        <title>{portfolio.title} - Surya Wiguna</title>
      </Head>
      <div className="flex flex-col gap-8">
        <h1 className="font-bold text-3xl">{portfolio.title}</h1>
        <div className="grid grid-cols-3 gap-5">
          {portfolio.images.map((image, key) => {
            return (
              <a
                key={key}
                href={image.link}
                className="relative drop-shadow-md scale-100 hover:scale-105 min-h-[160px]"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={image.src}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  objectPosition="start"
                  className="overflow-hidden rounded-lg"
                  placeholder="blur"
                  blurDataURL={image.src}
                />
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
