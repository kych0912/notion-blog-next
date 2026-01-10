import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { getUserInfoAndPostByName } from '@/app/server/queries/user';
import { getUserPosts } from '@/app/server/queries/post';
import type { UserType, PostType } from '@/app/server/db/schema';
import { getUserPostCategoriesOptions } from '@/app/react-query/options/category';

import User from './_components/User';
import Feed from './_components/Feed';
import CoverImage from './_components/CoverImage';
import { CollapsibleDemo } from './_components/Category/Category';

const Post = async ({ params }: { params: Promise<{ user: string }> }) => {
  const { user } = await params;
  const decodedUser = decodeURIComponent(user);

  const [userInfo, posts]: [UserType | null, PostType[]] = await Promise.all([
    getUserInfoAndPostByName(decodedUser),
    getUserPosts(decodedUser),
  ]);

  const avatar = userInfo?.avatar ?? '';
  const name = userInfo?.name ?? '';

  if (!userInfo) {
    return notFound();
  }

  const queryClient = new QueryClient();

  queryClient.prefetchQuery(getUserPostCategoriesOptions(decodedUser));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center justify-center">
        <CoverImage src={'/Default_Image.jpeg'} />
        <User avatar={avatar} name={name} />

        <div className="flex w-full justify-center items-start pb-10 max-w-[960px]">
          <Feed posts={posts} />
          <Suspense fallback={<div>Loading...</div>}>
            <CollapsibleDemo userName={decodedUser} />
          </Suspense>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Post;
