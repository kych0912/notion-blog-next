import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getUserInfoAndPostByName } from '@/app/server/queries/user';
import { getUserPosts } from '@/app/server/queries/post';
import type { UserType, PostType } from '@/app/server/db/schema';
import { getUserPostCategoriesOptions } from '@/app/react-query/options/category';
import { getQueryClient } from '@/app/utils/utils';

import User from './_components/User';
import Feed from './_components/Feed';
import Category from './_components/Category/Category';

const Post = async ({ params }: { params: Promise<{ user: string }> }) => {
  const { user } = await params;
  const decodedUser = decodeURIComponent(user);

  // Resolve the archive before sending HTML so the articles remain readable without JavaScript.
  const [userInfo, posts]: [UserType | null, PostType[]] = await Promise.all([
    getUserInfoAndPostByName(decodedUser),
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
