import { forwardRef } from 'react';

import PostCard from '../../PostCard/PostCard';
import type { PostCardVariant } from '../../PostCard/PostCard';

const initialPost = {
  id: '',
  author: '',
  authorSlug: null as string | null,
  description: '',
  date: new Date(),
  title: '',
  image: `null`,
  avatar: '',
};

interface IFeedItemProps {
  post?: Iposts & { authorSlug?: string | null };
  isLoading?: boolean;
  variant?: PostCardVariant;
}

const FeedItem = forwardRef<HTMLDivElement, IFeedItemProps>(
  ({ post = initialPost, isLoading = false, variant = 'row' }, ref) => {
    return (
      <div ref={ref} className="feed-item">
        <PostCard
          id={post.id}
          user={post.author}
          authorSlug={post.authorSlug}
          caption={post.description}
          date={post.date}
          title={post.title}
          image={post.image}
          avatar={post.avatar}
          isLoading={isLoading}
          variant={variant}
        />
      </div>
    );
  },
);

FeedItem.displayName = 'FeedItem';

export default FeedItem;
