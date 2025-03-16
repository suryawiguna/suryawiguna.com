export default function Histories({ blok }) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-3xl">{blok.title}</h2>
      <ol>
        {blok.histories
          .filter((item: any) => !item.hide)
          .map((item: any, key: number) => {
            return (
              <li key={key}>
                <div className="grid gap-2">
                  <p className="text-lg">
                    {item.title} at
                    <span className="font-semibold ml-1">{item.place}</span>
                  </p>
                  <small className="mb-1 text-sm font-normal leading-none text-zinc-400">
                    {item.periode}
                  </small>
                </div>
                <hr className="my-2 border-1 border-zinc-100" />
              </li>
            );
          })}
      </ol>
    </section>
  );
}
