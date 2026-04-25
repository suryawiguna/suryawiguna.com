export default function Skills({ blok }) {
  return (
    <section className="m-skills-block">
      <h2 className="m-h2">{blok.title}</h2>
      <div className="m-skills">
        {blok.skills.map((item, key) => (
          <span key={key} className="m-chip">
            {item.name}
          </span>
        ))}
      </div>
    </section>
  );
}
