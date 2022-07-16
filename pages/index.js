import Image from "next/image";

export default function Index({ data }) {
  const { home } = data;
  return (
    <div className="flex flex-col items-start gap-6">
      <h1 className="font-bold text-3xl">{home.title}</h1>
      <Image
        src={home.profile_img}
        width={120}
        height={120}
        className="rounded-full"
      />
      <p className="text-lg leading-relaxed">
        I'm designing and developing website to help everyone. Kindly reach me
        on{" "}
        <a href="mailto:hi@suryawiguna.com" className="underline font-bold">
          Email
        </a>{" "}
        or{" "}
        <a
          href="https://www.linkedin.com/in/suryawigunaa"
          className="underline font-bold"
        >
          LinkedIn
        </a>
      </p>
      <h2 className="text-xl font-bold">Recent Works</h2>
      <div className="flex gap-5">
        {home.recent_works.map((work, key) => {
          return (
            <a
              key={key}
              href={work.link}
              className="drop-shadow hover:drop-shadow-lg"
              target="_blank"
            >
              <Image
                src={work.img}
                width={284}
                height={180}
                className="rounded-lg"
              />
            </a>
          );
        })}
      </div>
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
