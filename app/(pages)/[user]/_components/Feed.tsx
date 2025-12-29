import type { PostType } from '@/app/server/db/schema';

import PostCard from '../../../components/PostCard/PostCard';

export default function Feed({ posts }: { posts: PostType[] }) {
  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col items-start justify-center px-[calc(min(16px,8vw))]">
      <div className="mt-2 text-xl font-bold">모든 포스트</div>

      <hr className="mt-1 mb-3 w-full border-gray-200" />

      {posts.length === 0 ? (
        <div className="flex w-full justify-center">
          <h1>No posts found</h1>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((item, index) => {
            return (
              <div key={index}>
                <PostCard
                  id={item.id}
                  user={item.author}
                  caption={item.description ?? ''}
                  date={new Date(item.date)}
                  image={item.image ?? ''}
                  title={item.title ?? ''}
                  avatar={item.avatar ?? ''}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
