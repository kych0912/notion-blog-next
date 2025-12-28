import { forwardRef } from 'react';

import PostCard from '../../PostCard/PostCard';

const initialPost = {
  id: '',
  author: '',
  description: '',
  date: new Date(),
  title: '',
  image: `null`,
  avatar: '',
};

interface IFeedItemProps {
  post?: Iposts;
  isLoading?: boolean;
}

const FeedItem = forwardRef<HTMLDivElement, IFeedItemProps>(
  ({ post = initialPost, isLoading = false }, ref) => {
    return (
      <div ref={ref} className="w-full">
        <PostCard
          id={post.id}
          user={post.author}
          caption={post.description}
          date={post.date}
          title={post.title}
          image={post.image}
          avatar={post.avatar}
          isLoading={isLoading}
        />
      </div>
    );
  },
);

FeedItem.displayName = 'FeedItem';

export default FeedItem;
