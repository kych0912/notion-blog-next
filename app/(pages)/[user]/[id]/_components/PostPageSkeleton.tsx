export default function PostPageSkeleton() {
  return (
    <div role="status" aria-label="게시글 로딩 중" aria-busy="true" className="w-full">
      {/* Header skeleton (matches PostHeader layout) */}
      <div className="mx-auto flex max-w-[720px] flex-col items-center justify-center px-[calc(min(16px,8vw))] py-2">
        <div className="w-full animate-pulse">
          {/* Title */}
          <div className="h-9 w-3/4 rounded bg-gray-200" />

          {/* Property row */}
          <div className="flex justify-between pt-2 pb-4">
            <div className="flex items-center">
              <div className="mr-2 h-6 w-6 rounded-full bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="mx-2 h-4 w-2 rounded bg-gray-200" />
              <div className="h-4 w-20 rounded bg-gray-200" />
            </div>
          </div>

          {/* Cover image */}
          <div className="relative h-[20rem] w-full rounded-[1rem] bg-gray-200" />
        </div>
      </div>

      {/* Body skeleton (matches NotionPageRenderer container width) */}
      <div className="mx-auto mb-10 flex w-full max-w-[720px] flex-col items-center justify-center px-[calc(min(16px,8vw))]">
        <div className="w-full animate-pulse space-y-3 py-6">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-11/12 rounded bg-gray-200" />
          <div className="h-4 w-10/12 rounded bg-gray-200" />
          <div className="h-4 w-9/12 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-8/12 rounded bg-gray-200" />
          <div className="h-32 w-full rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-10/12 rounded bg-gray-200" />
          <div className="h-4 w-9/12 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
