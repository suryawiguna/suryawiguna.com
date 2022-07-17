import Image from "next/image";
import Layout from "../components/layout";

export default function Skill({ data }) {
  const { skill } = data;
  return (
    <Layout title={skill.title}>
      <div className="flex flex-col items-center sm:items-start gap-8">
        <h1 className="font-bold text-3xl self-start">{skill.title}</h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-12 md:gap-20">
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
                <h3 className="text-center self-center text-md">{item.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
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
