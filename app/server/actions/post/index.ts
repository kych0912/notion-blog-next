'use server';

import { redirect } from 'next/navigation';

import {
  getPostDetail as getPostDetailFromDB,
  getLatestPosts as getLatestPostsFromDB,
} from '@/app/server/queries/post';
import { isDescendantOfStoredPage } from '@/app/lib/notion-api';
import { auth } from '@/auth';
import { BaseServerResposne } from '@/app/types/base';
import { PostType } from '@/app/server/db/schema';

import { deletePost, getPostById } from '../../queries/post';
import { ActionState } from '../types';

export interface GetPostDetailResponse {
  id: string;
  isAuthor: boolean;
  isChild: boolean;
  data: PostType | null;
}

export async function getPostDetailAction(
  id: string,
  user: string,
): Promise<BaseServerResposne<GetPostDetailResponse>> {
  const session = await auth();
  const viewerName = session?.user?.name;

  const decodedViewerName = decodeURIComponent(viewerName ?? '');
  const decodedUserName = decodeURIComponent(user ?? '');
  let isAuthor = false;
  if (decodedViewerName && decodedViewerName === decodedUserName) {
    isAuthor = true;
  }
  const res = await getPostDetailFromDB(id, decodedUserName);
  const postData = res[0];

  if (!Array.isArray(res) || res.length === 0) {
    const isChildPage = await isDescendantOfStoredPage(id);

    if (!isChildPage) {
      throw new Error('NOT_FOUND');
    }

    return {
      data: { id, isAuthor, isChild: true, data: null },
      isSuccess: true,
    };
  }

  return {
    data: { id, isAuthor, isChild: false, data: postData },
    isSuccess: true,
  };
}

export async function deletePostAction(
  state: ActionState<string>,
  formData: FormData,
): Promise<ActionState<string>> {
  try {
    const id = formData.get('id') as string;

    const post = await getPostById(id);
    if (!post) {
      return { error: true, message: 'Post not found' };
    }
    await deletePost(id);
  } catch {
    return { error: true, message: 'Failed to delete post' };
  }
  redirect('/');
}

export async function getLatestPostsAction(pageParam: number = 1) {
  const posts = await getLatestPostsFromDB(pageParam);
  return { posts };
}
