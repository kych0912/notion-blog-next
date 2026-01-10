import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { getPostsByCategoryIdOptions } from '@/app/react-query/options/category';

function CategoryPost({ title, id, user }: { title: string; id: string; user: string }) {
  return (
    <Link href={`/${encodeURIComponent(user)}/${id}`} className="no-underline">
      <div
        className="group rounded-md flex items-center gap-2 bg-background/40 px-3 py-2 text-sm text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        title={title}
      >
        <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </span>
      </div>
    </Link>
  );
}

function CategoryPostSkeleton({ widthClassName }: { widthClassName: string }) {
  return (
    <div className="rounded-md flex items-center gap-2 bg-background/40 px-3 py-2 text-sm text-foreground shadow-sm">
      <div className={`h-4 ${widthClassName} animate-pulse rounded bg-gray-200`} />
    </div>
  );
}

function CategoryPostListSkeleton() {
  const widths = ['w-4/5', 'w-3/5', 'w-11/12', 'w-2/3'];

  return (
    <>
      {widths.map((width, idx) => (
        <CategoryPostSkeleton key={`category-post-skeleton-${idx}`} widthClassName={width} />
      ))}
    </>
  );
}

export function CategoryPostList({ categoryId }: { categoryId: string }) {
  const { data: posts, isPending } = useQuery(getPostsByCategoryIdOptions(categoryId));

  if (isPending) return <CategoryPostListSkeleton />;

  if (!posts) return null;

  return (
    <>
      {posts.map((post) => (
        <CategoryPost key={post.id} title={post.title ?? ''} id={post.id} user={post.author} />
      ))}
    </>
  );
}
