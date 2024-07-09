export default function Histories({ blok }) {
  return (
    <ol>
      {blok.histories
        .filter((item: any) => !item.hide)
        .map((item: any, key: number) => {
          return (
            <li key={key}>
              <div className="grid gap-2">
                <p>
                  {item.title} at
                  <span className="font-semibold ml-1">{item.place}</span>
                </p>
                <small className="mb-1 text-xs font-normal leading-none text-zinc-400">
                  {item.periode}
                </small>
              </div>
              <hr className="my-4 border-1 border-zinc-100 dark:border-zinc-600" />
            </li>
          );
        })}
    </ol>
  );
}
