import { Box } from '@mui/material';
import { notFound } from 'next/navigation';

import { getUserInfoAndPostByName } from '@/app/server/queries/user';

import User from './_components/User';
import Feed from './_components/Feed';
import CoverImage from './_components/CoverImage';

const Post = async ({ params }: { params: Promise<{ user: string }> }) => {
  const { user } = await params;
  let avatar_url = '';
  let name = '';
  let posts;

  try {
    const _response = await getUserInfoAndPostByName(user);

    avatar_url = _response[0].avatar ?? '';
    name = _response[0].name;
    posts = _response[1];
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Not Found') {
      return notFound();
    }
    throw err;
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
      <User avatar={avatar_url} name={name} />

      <Feed posts={posts} />
    </Box>
  );
};

export default Post;
