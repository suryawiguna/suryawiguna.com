import Image from "next/image";

export default function Experience({ data }) {
  return (
    <div className="flex flex-col items-start gap-6">
      <h1 className="font-bold text-3xl">Experience</h1>
    </div>
  );
}

export async function getStaticProps(context) {
  const data = require("/data/data.json");

  return {
    props: {
      data: data,
    },
  };
}
