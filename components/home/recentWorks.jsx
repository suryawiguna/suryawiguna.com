import WorkCard from "../portfolio/workCard";

export default function RecentWorks({ blok }) {
  return (
    <div className="mt-8 flex flex-col gap-6">
      <h2 className="text-xl font-bold">{blok.title}</h2>
      <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blok.items.map((work, key) => {
          return <WorkCard work={work} />;
        })}
      </div>
    </div>
  );
}
