import type { Sector } from "content/services";

export default function Sectors({
  heading,
  intro,
  items,
}: {
  heading: string;
  intro: string;
  items: Sector[];
}) {
  return (
    <section id="sectors" className="m-section">
      <h2 className="m-h2">{heading}</h2>
      <p className="m-section-intro">{intro}</p>
      <ul className="m-sectors">
        {items.map((sector) => (
          <li key={sector.name} className="m-sector">
            <h3 className="m-sector-name">{sector.name}</h3>
            <p className="m-sector-blurb">{sector.blurb}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
