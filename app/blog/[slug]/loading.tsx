export default function Loading() {
  return (
    <div role="status" className="flex flex-col gap-4 animate-pulse">
      <div>
        <div className="h-12 bg-gray-200 rounded-full dark:bg-gray-700 max-w-md mb-2"></div>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-xs mb-2"></div>
      </div>
      <div className="bg-gray-200 rounded-2xl dark:bg-gray-700 h-32 max-w-48 mb-2"></div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 bg-gray-200 rounded-2xl dark:bg-gray-700 h-5 max-w-3xl"></div>
        <div className="flex flex-col gap-2 bg-gray-200 rounded-2xl dark:bg-gray-700 h-5 max-w-xl"></div>
        <div className="flex flex-col gap-2 bg-gray-200 rounded-2xl dark:bg-gray-700 h-5 max-w-2xl"></div>
        <div className="flex flex-col gap-2 bg-gray-200 rounded-2xl dark:bg-gray-700 h-5 max-w-lg"></div>
        <div className="flex flex-col gap-2 bg-gray-200 rounded-2xl dark:bg-gray-700 h-5 max-w-md"></div>
        <div className="flex flex-col gap-2 bg-gray-200 rounded-2xl dark:bg-gray-700 h-5 max-w-3xl"></div>
        <div className="flex flex-col gap-2 bg-gray-200 rounded-2xl dark:bg-gray-700 h-5 max-w-xl"></div>
        <div className="flex flex-col gap-2 bg-gray-200 rounded-2xl dark:bg-gray-700 h-5 max-w-2xl"></div>
        <div className="flex flex-col gap-2 bg-gray-200 rounded-2xl dark:bg-gray-700 h-5 max-w-lg"></div>
        <div className="flex flex-col gap-2 bg-gray-200 rounded-2xl dark:bg-gray-700 h-5 max-w-md"></div>
      </div>
    </div>
  );
}
