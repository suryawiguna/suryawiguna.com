export default function Loading() {
  return (
    <div className="animate-pulse" role="status">
      <div className="flex flex-col items-center gap-6 mb-5">
        <div className="h-24 bg-zinc-200 rounded-full   w-24"></div>
        <div className="h-5 bg-zinc-200 rounded-lg   w-full max-w-sm"></div>
        <div className="flex gap-3 max-w-xs">
          {Array(5)
            .fill(1)
            .map((i) => {
              return (
                <div key={i} className="h-8 w-8 bg-zinc-200 rounded-lg  "></div>
              );
            })}
        </div>
        {Array(5)
          .fill(1)
          .map((i) => {
            return (
              <div
                key={i}
                className="h-14 w-screen max-w-sm bg-zinc-200 rounded-lg  "
              ></div>
            );
          })}
      </div>
    </div>
  );
}
