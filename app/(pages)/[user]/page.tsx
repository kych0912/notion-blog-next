import { Box } from '@mui/material';
import { notFound } from 'next/navigation';

import { getUserInfoAndPostByName } from '@/app/server/queries/user';
import { getUserPosts } from '@/app/server/queries/post';
import type { UserType, PostType } from '@/app/server/db/schema';

import User from './_components/User';
import Feed from './_components/Feed';
import CoverImage from './_components/CoverImage';

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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CoverImage src={'/Default_Image.jpeg'} />
      <User avatar={avatar} name={name} />

      <Feed posts={posts} />
    </Box>
  );
};

export default Post;
