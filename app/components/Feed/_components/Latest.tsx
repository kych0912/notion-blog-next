'use client';

import { useInView } from 'react-intersection-observer';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getPostOptions } from '@/app/react-query/post';

import FeedItem from './FeedItem';

export default function Latest() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(getPostOptions.getLatestPosts);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 모든 페이지의 포스트를 하나의 배열로 합침
  const allPosts = posts?.pages.flatMap((page) => page.posts) ?? [];

  if (allPosts.length === 0) {
    return (
      <div className="feed-empty">
        <h2>아직 게시글이 없어요.</h2>
        <p>새 글이 발행되면 이곳에 표시됩니다.</p>
      </div>
    );
  }

  return (
    <>
      {allPosts.map((post, index) => (
        <FeedItem
          key={post.id || index}
          post={{
            id: post.id,
            author: post.author,
            description: post.description ?? '',
            date: new Date(post.date),
            title: post.title ?? '',
            image: post.image ?? '',
            avatar: post.avatar ?? '',
          }}
          ref={index === allPosts.length - 1 ? ref : undefined}
          variant={index === 0 ? 'featured' : 'row'}
        />
      ))}
      {isFetchingNextPage ? <FeedItem isLoading variant="row" /> : null}
    </>
  );
}
