'use server';

import { deletePost, getPostById } from '../../queries/post';
import { ActionState } from '../types';

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
    return { success: true, message: 'Post deleted successfully' };
  } catch {
    return { error: true, message: 'Failed to delete post' };
  }
}
