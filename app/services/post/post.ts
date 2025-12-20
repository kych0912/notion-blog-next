import axios from 'axios';

import type { PostType } from '@/app/server/db/schema';

export async function getLatestPosts(pageParam: number = 1) {
  const res = await axios.get(`/api/post/latest?page=${pageParam}`);

  return res.data as PostType[];
}
