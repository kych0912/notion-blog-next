import PostCardLoading from '@/app/components/PostCard/PostCardLoading';

export default function UserPageSkeleton() {
  return (
    <div role="status" aria-label="유저 페이지 로딩 중" aria-busy="true" className="w-full">
      <div className="flex flex-col items-center justify-center">
        {/* CoverImage skeleton */}
        <div className="relative h-[30vh] w-full max-w-[1200px] rounded-none bg-gray-200 xl:rounded-[24px]" />

        {/* User skeleton (matches -mt and max width) */}
        <div className="mx-auto -mt-[60px] flex max-w-[720px] flex-col items-center justify-center px-[calc(min(16px,8vw))]">
          <div className="flex w-full flex-col items-center justify-start">
            <div className="z-10 h-32 w-32 rounded-full bg-gray-200" />
            <div className="pt-2">
              <div className="h-8 w-40 rounded bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Feed + Category skeleton (matches page layout) */}
        <div className="flex w-full justify-center items-start pb-10 max-w-[960px]">
          {/* Feed skeleton (matches Feed layout) */}
          <div className="flex w-full flex-col items-start justify-center px-[calc(min(32px,8vw))]">
            <div className="mt-2 h-7 w-28 rounded bg-gray-200" />
            <hr className="mt-1 mb-3 w-full border-gray-200" />

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={`user-post-skeleton-${index}`}>
                  <PostCardLoading />
                </div>
              ))}
            </div>
          </div>

          {/* Category skeleton (matches Category layout) */}
          <div className="flex flex-col h-full justify-start gap-2 max-md:hidden w-[200px] shrink-0 pt-10">
            {['w-[140px]', 'w-[120px]', 'w-[160px]', 'w-[110px]', 'w-[150px]'].map(
              (widthClass, index) => (
                <div
                  key={`user-category-skeleton-${index}`}
                  className="flex items-center justify-between gap-4 w-full"
                >
                  <div className={`h-4 ${widthClass} rounded bg-gray-200`} />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
