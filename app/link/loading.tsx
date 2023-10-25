export default function Loading() {
  return (
    <div className="animate-pulse" role="status">
      <div className="flex flex-col items-center gap-4 mb-5">
        <div className="h-24 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-full max-w-xs"></div>
        <div className="flex gap-3 max-w-xs">
          {Array(5)
            .fill(1)
            .map((i) => {
              return (
                <div
                  key={i}
                  className="h-8 w-8 bg-gray-200 rounded-full dark:bg-gray-700"
                ></div>
              );
            })}
        </div>
        {Array(5)
          .fill(1)
          .map((i) => {
            return (
              <div
                key={i}
                className="h-12 w-screen max-w-xs bg-gray-200 rounded-full dark:bg-gray-700"
              ></div>
            );
          })}
      </div>
    </div>
  );
}
