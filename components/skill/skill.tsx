export default function Skills({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="m-skills-block">
      <h2 className="m-h2">{title}</h2>
      <div className="m-skills">
        {items.map((name) => (
          <span key={name} className="m-chip">
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
