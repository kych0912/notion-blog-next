import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { getPostsByCategoryIdOptions } from '@/app/react-query/options/category';

function CategoryPost({ title, id, user }: { title: string; id: string; user: string }) {
  return (
    <Link
      href={`/${encodeURIComponent(user)}/${id}`}
      prefetch={false}
      className="profile-category-post"
      title={title}
    >
      {title || '제목 없는 글'}
    </Link>
  );
}

function CategoryPostSkeleton({ widthClassName }: { widthClassName: string }) {
  return (
    <div
      className={`profile-category-post-skeleton skeleton ${widthClassName}`}
      aria-hidden="true"
    />
  );
}

function CategoryPostListSkeleton() {
  const widths = ['w-4/5', 'w-3/5', 'w-11/12', 'w-2/3'];
  return (
    <div role="status" aria-label="카테고리의 글을 불러오는 중">
      {widths.map((width, idx) => (
        <CategoryPostSkeleton key={`category-post-skeleton-${idx}`} widthClassName={width} />
      ))}
    </div>
  );
}

export function CategoryPostList({ categoryId }: { categoryId: string }) {
  const {
    data: posts,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useQuery(getPostsByCategoryIdOptions(categoryId));
  if (isPending) return <CategoryPostListSkeleton />;
  if (isError)
    return (
      <div className="profile-category-message">
        <p role="alert">글을 불러오지 못했어요.</p>
        <button
          type="button"
          className="profile-retry"
          disabled={isFetching}
          onClick={() => {
            void refetch();
          }}
        >
          다시 불러오기
        </button>
      </div>
    );
  if (!posts?.length) return <p className="profile-category-message">이 카테고리에 글이 없어요.</p>;
  return (
    <>
      {posts.map((post) => (
        <CategoryPost key={post.id} title={post.title ?? ''} id={post.id} user={post.author} />
      ))}
    </>
  );
}
