export default function Loading() {
  return (
    <div role="status" className="flex flex-col gap-4 animate-pulse">
      <div className="h-8 bg-zinc-200 rounded-lg dark:bg-zinc-700 w-48 mb-5"></div>
      <div className="flex flex-col gap-4 mb-5">
        <div className="h-4 bg-zinc-200 rounded-lg dark:bg-zinc-700 max-w-[100px]"></div>
        <div className="h-5 bg-zinc-200 rounded-lg dark:bg-zinc-700 max-w-[300px]"></div>
        <div className="h-4 bg-zinc-200 rounded-lg dark:bg-zinc-700 max-w-[200px]"></div>
      </div>
      <div className="flex flex-col gap-4 mb-5">
        <div className="h-4 bg-zinc-200 rounded-lg dark:bg-zinc-700 max-w-[100px]"></div>
        <div className="h-5 bg-zinc-200 rounded-lg dark:bg-zinc-700 max-w-[300px]"></div>
        <div className="h-4 bg-zinc-200 rounded-lg dark:bg-zinc-700 max-w-[200px]"></div>
      </div>
      <div className="flex flex-col gap-4 mb-5">
        <div className="h-4 bg-zinc-200 rounded-lg dark:bg-zinc-700 max-w-[100px]"></div>
        <div className="h-5 bg-zinc-200 rounded-lg dark:bg-zinc-700 max-w-[300px]"></div>
        <div className="h-4 bg-zinc-200 rounded-lg dark:bg-zinc-700 max-w-[200px]"></div>
      </div>
    </div>
  );
}
