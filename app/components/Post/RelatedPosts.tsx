import Link from 'next/link';

import PostCard from '@/app/components/PostCard/PostCard';
import type { PostType } from '@/app/server/db/schema';
import { getRelatedPosts } from '@/app/server/queries/public-posts';

export default async function RelatedPosts({ post }: { post: PostType }) {
  const posts = await getRelatedPosts(post);
  if (!posts.length) return null;

  return (
    <section className="related-posts" aria-labelledby="related-posts-title">
      <div className="related-posts__heading">
        <h2 id="related-posts-title">
          {post.category ? '같은 카테고리의 글' : '이 작성자의 다른 글'}
        </h2>
        <Link className="text-link" href={`/${encodeURIComponent(post.author)}`}>
          모든 글
        </Link>
      </div>
      {posts.map((related) => (
        <PostCard
          key={related.id}
          id={related.id}
          user={related.author}
          title={related.title ?? ''}
          caption={related.description ?? ''}
          image={related.image ?? ''}
          avatar={related.avatar ?? ''}
          date={new Date(related.date)}
          variant="row"
          headingLevel="h3"
        />
      ))}
    </section>
  );
}
