export default function Histories({ blok }) {
  return (
    <div>
      <h2 className="m-h2">{blok.title}</h2>
      <ul className="m-list">
        {blok.histories
          .filter((item: any) => !item.hide)
          .map((item: any, key: number) => (
            <li key={key}>
              <span className="m-li-top">
                {item.title} at <strong>{item.place}</strong>
              </span>
              <span className="m-li-sub">{item.periode}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
