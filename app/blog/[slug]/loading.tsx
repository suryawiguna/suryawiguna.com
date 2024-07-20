export default function Loading() {
  return (
    <div role="status" className="flex flex-col gap-4 animate-pulse">
      <div>
        <div className="h-10 bg-zinc-200 rounded-lg mb-2"></div>
        <div className="h-3 bg-zinc-200 rounded-lg max-w-[120px] mb-2"></div>
      </div>
      <div className="bg-zinc-200 rounded-lg   h-60 max-w-48 mb-1"></div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 bg-zinc-200 rounded-lg h-4 max-w-3xl"></div>
        <div className="flex flex-col gap-2 bg-zinc-200 rounded-lg h-4 max-w-xl"></div>
        <div className="flex flex-col gap-2 bg-zinc-200 rounded-lg h-4 max-w-2xl"></div>
        <div className="flex flex-col gap-2 bg-zinc-200 rounded-lg h-4 max-w-lg"></div>
        <div className="flex flex-col gap-2 bg-zinc-200 rounded-lg h-4 max-w-md"></div>
        <div className="flex flex-col gap-2 bg-zinc-200 rounded-lg h-4 max-w-3xl"></div>
        <div className="flex flex-col gap-2 bg-zinc-200 rounded-lg h-4 max-w-xl"></div>
        <div className="flex flex-col gap-2 bg-zinc-200 rounded-lg h-4 max-w-2xl"></div>
        <div className="flex flex-col gap-2 bg-zinc-200 rounded-lg h-4 max-w-lg"></div>
        <div className="flex flex-col gap-2 bg-zinc-200 rounded-lg h-4 max-w-md"></div>
      </div>
    </div>
  );
}
