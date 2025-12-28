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

        {/* Feed skeleton (matches Feed layout) */}
        <div className="mx-auto flex w-full max-w-[720px] flex-col items-start justify-center px-[calc(min(16px,8vw))]">
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
      </div>
    </div>
  );
}
