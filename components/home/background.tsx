import type { HistoryItem } from "content/home";

type Group = { title: string; items: HistoryItem[] };

// Experience, education and tools as one compact block: a period column and
// a line of text each, instead of two CV columns and a row of chips.
export default function Background({
  groups,
  tools,
}: {
  groups: Group[];
  tools: { title: string; items: string[] };
}) {
  return (
    <section id="about" className="m-section m-split">
      <h2 className="m-h2">Background</h2>
      <div className="m-facts">
        {groups.map((group) => (
          <div key={group.title} className="m-facts-group">
            <h3 className="m-eyebrow">{group.title}</h3>
            <dl className="m-facts-list">
              {group.items.map((item) => (
                <div key={`${item.title}-${item.period}`} className="m-fact">
                  <dt>{item.period}</dt>
                  <dd>
                    {item.title}, {item.place}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
        <div className="m-facts-group">
          <h3 className="m-eyebrow">{tools.title}</h3>
          <p className="m-facts-text">{tools.items.join(", ")}</p>
        </div>
      </div>
    </section>
  );
}
