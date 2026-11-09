import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getUserInfoAndPostByName } from '@/app/server/queries/user';
import { getUserPosts } from '@/app/server/queries/post';
import type { UserType, PostType } from '@/app/server/db/schema';
import { getUserPostCategoriesOptions } from '@/app/react-query/options/category';
import { getQueryClient } from '@/app/utils/utils';
import { getMetadata, getUserPath } from '@/app/components/MetaData/getMetaData';

import User from './_components/User';
import Feed from './_components/Feed';
import Category from './_components/Category/Category';

const getUserInfo = cache(getUserInfoAndPostByName);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ user: string }>;
}): Promise<Metadata> {
  const { user } = await params;
  const userInfo = await getUserInfo(decodeURIComponent(user));

  if (!userInfo) notFound();

  return getMetadata({
    title: `${userInfo.name}의 블로그`,
    description: `${userInfo.name}님이 노션으로 작성한 글을 NextBlog에서 만나보세요.`,
    asPath: getUserPath(userInfo.name),
  });
}

const Post = async ({ params }: { params: Promise<{ user: string }> }) => {
  const { user } = await params;
  const decodedUser = decodeURIComponent(user);

  // Resolve the archive before sending HTML so the articles remain readable without JavaScript.
  const [userInfo, posts]: [UserType | null, PostType[]] = await Promise.all([
    getUserInfo(decodedUser),
    getUserPosts(decodedUser),
  ]);

  const avatar = userInfo?.avatar ?? '';
  const name = userInfo?.name ?? '';

  if (!userInfo) {
    return notFound();
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(getUserPostCategoriesOptions(decodedUser));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="profile-page site-container">
        <User avatar={avatar} name={name} userId={userInfo.id} />
        <div className="profile-body">
          <Category userName={decodedUser} />
          <Feed posts={posts} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Post;
