import WorkCard from "./workCard";

export default function Portfolios({ blok }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      {blok.items.map((item, key) => {
        return <WorkCard key={key} work={item} />;
      })}
    </div>
  );
}
