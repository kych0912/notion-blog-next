import type { PostType } from '@/app/server/db/schema';

import PostCard from '../../../components/PostCard/PostCard';

export default function Feed({ posts }: { posts: PostType[] }) {
  return (
    <section className="profile-feed" aria-labelledby="profile-posts-title">
      <div className="profile-section-heading">
        <h2 id="profile-posts-title">모든 포스트</h2>
      </div>
      {posts.length === 0 ? (
        <div className="profile-empty">
          <h3>아직 발행한 글이 없어요.</h3>
          <p>글을 발행하면 이곳에 모입니다.</p>
        </div>
      ) : (
        <div className="profile-posts">
          {posts.map((item) => (
            <PostCard
              key={item.id}
              id={item.id}
              user={item.author}
              caption={item.description ?? ''}
              date={new Date(item.date)}
              image={item.image ?? ''}
              title={item.title ?? ''}
              avatar={item.avatar ?? ''}
              variant="row"
              headingLevel="h3"
            />
          ))}
        </div>
      )}
    </section>
  );
}
