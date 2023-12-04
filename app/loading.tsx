export default function Loading() {
  return (
    <div role="status" className="flex flex-col animate-pulse">
      <div className="flex flex-col gap-4 mb-5">
        <div className="h-8 bg-zinc-200 rounded-lg dark:bg-zinc-700 w-48"></div>
        <div className="h-32 bg-zinc-200 rounded-full dark:bg-zinc-700 w-32"></div>
        <div className="h-5 bg-zinc-200 rounded-lg dark:bg-zinc-700 max-w-[600px]"></div>
        <div className="h-5 bg-zinc-200 rounded-lg dark:bg-zinc-700 max-w-[420px]"></div>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        <div className="h-8 bg-zinc-200 rounded-lg dark:bg-zinc-700 w-48"></div>
        <div className="h-5 bg-zinc-200 rounded-lg dark:bg-zinc-700 max-w-[600px]"></div>
        <div className="h-5 bg-zinc-200 rounded-lg dark:bg-zinc-700 max-w-[420px]"></div>
        <div className="h-5 bg-zinc-200 rounded-lg dark:bg-zinc-700 max-w-[360px]"></div>
      </div>
    </div>
  );
}
