'use server';

import { auth } from '@/auth';
import { ActionState } from '@/app/server/actions/types';
import {
  createCategory,
  getUserPostCategories as getUserPostCategoriesQuery,
  getPostCategories as getPostCategoriesQuery,
  getCategories,
  updatePostCategory,
} from '@/app/server/queries/category';

export async function getUserPostCategoriesAction(userName: string) {
  const decodedUserName = decodeURIComponent(userName ?? '');

  return getUserPostCategoriesQuery(decodedUserName);
}

export async function getPostCategoriesAction(id: string) {
  return getPostCategoriesQuery(id);
}

export async function getAllCategoriesAction() {
  return getCategories();
}

export async function updatePostCategoryAction(
  postId: string,
  categoryId: string | null,
): Promise<ActionState<string>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { ok: false, message: '로그인이 필요합니다.' };
    }

    await updatePostCategory(postId, categoryId);

    return { ok: true, message: '카테고리가 변경되었습니다.' };
  } catch {
    return { ok: false, message: '카테고리 변경 중 오류가 발생했습니다.' };
  }
}

export async function createCategoryAction(name: string): Promise<ActionState<string>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { ok: false, message: '로그인이 필요합니다.' };
    }

    if (!name || name.trim().length < 2) {
      return { ok: false, message: '카테고리 이름은 2자 이상이어야 합니다.' };
    }

    if (name.length > 50) {
      return { ok: false, message: '카테고리 이름은 50자 이하여야 합니다.' };
    }

    const created = await createCategory(name.trim());
    if (!created) {
      return { ok: false, message: '카테고리 생성에 실패했습니다.' };
    }

    return { ok: true, message: '카테고리가 생성되었습니다.' };
  } catch {
    return { ok: false, message: '카테고리 생성 중 오류가 발생했습니다.' };
  }
}
