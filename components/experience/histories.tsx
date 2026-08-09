import type { HistoryItem } from "content/home";

export default function Histories({
  title,
  items,
}: {
  title: string;
  items: HistoryItem[];
}) {
  return (
    <div>
      <h2 className="m-h2">{title}</h2>
      <ul className="m-list">
        {items.map((item, key) => (
          <li key={key}>
            <span className="m-li-top">
              {item.title} at <strong>{item.place}</strong>
            </span>
            <span className="m-li-sub">{item.period}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
