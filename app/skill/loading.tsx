export default function Loading() {
  return (
    <div role="status" className="flex flex-col gap-4 animate-pulse">
      <div className="h-8 bg-zinc-200 rounded-full dark:bg-zinc-700 w-48 mb-5"></div>
      <div
        role="status"
        className="grid grid-cols-2 sm:grid-cols-4 gap-6 animate-pulse"
      >
        {Array(8)
          .fill("i")
          .map((i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-2 bg-zinc-200 rounded-2xl dark:bg-zinc-700 h-32 max-w-48"
              ></div>
            );
          })}
      </div>
    </div>
  );
}
