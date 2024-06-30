export default function Loading() {
  return (
    <div role="status" className="flex flex-col gap-4 animate-pulse">
      <div className="h-8 bg-zinc-200 rounded-lg dark:bg-zinc-700 w-48 mb-5"></div>
      <div
        role="status"
        className="grid grid-cols sm:grid-cols-2 gap-6 animate-pulse"
      >
        {Array(8)
          .fill("i")
          .map((i) => {
            return (
              <div
                key={i}
                className="rounded-xl bg-zinc-200 dark:bg-zinc-700 p-4 flex flex-col gap-2 h-60 max-w-48"
              ></div>
            );
          })}
      </div>
    </div>
  );
}
