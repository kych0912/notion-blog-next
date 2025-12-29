export default function PostCardLoading() {
  return (
    <div className="w-full">
      <div className="h-[200px] w-full animate-pulse rounded-t-lg bg-gray-200" />

      <div className="p-4">
        <div className="h-6 w-4/5 animate-pulse rounded bg-gray-200" />

        <div className="mt-3 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        </div>

        <div className="mt-3 h-4 w-1/3 animate-pulse rounded bg-gray-200" />

        <div className="mt-3 flex items-center gap-3">
          <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
