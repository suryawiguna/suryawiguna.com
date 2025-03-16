export default function Skills({ blok }) {
  return (
    <section className="grid gap-4">
      <h2 className="text-3xl">{blok.title}</h2>
      <div>
        {blok.skills.map((item, key) => {
          return (
            <h3
              key={key}
              className={`inline-block m-3 text-center text-zinc-800 text-lg${
                key == 0 ? " ml-0" : ""
              }`}
            >
              {item.name}
            </h3>
          );
        })}
      </div>
    </section>
  );
}
