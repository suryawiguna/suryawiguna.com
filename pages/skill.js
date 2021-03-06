import Head from "next/head";
import Image from "next/image";

export default function Skill({ data }) {
  const { skill } = data;
  return (
    <>
      <Head>
        <title>{`${skill.title} - Surya Wiguna`}</title>
      </Head>
      <div className="flex flex-col items-center sm:items-start gap-8">
        <h1 className="font-bold text-3xl self-start">{skill.title}</h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-16 md:gap-20">
          {skill.items.map((item, key) => {
            return (
              <div key={key} className="flex flex-col gap-2">
                <div className="relative min-h-[60px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL={item.image}
                  />
                </div>
                <h3 className="text-center self-center text-sm md:text-base">{item.name}</h3>
              </div>
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
