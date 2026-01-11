import { queryOptions } from '@tanstack/react-query';

import {
  getUserPostCategoriesAction,
  getPostCategoriesAction,
  getAllCategoriesAction,
  getPostsByCategoryIdAction,
} from '@/app/server/actions/category';

export const getUserPostCategoriesOptions = (userName: string) => {
  return queryOptions({
    queryKey: ['user-post-categories', userName],
    queryFn: () => getUserPostCategoriesAction(userName),
  });
};

export const getPostCategoryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['post-category', id],
    queryFn: () => getPostCategoriesAction(id),
  });
};

export const getAllCategoriesOptions = (userName: string | undefined) => {
  return queryOptions({
    queryKey: ['all-categories', userName],
    queryFn: () => getAllCategoriesAction(userName),
  });
};

export const getPostsByCategoryIdOptions = (categoryId: string) => {
  return queryOptions({
    queryKey: ['posts-by-category-id', categoryId],
    queryFn: () => getPostsByCategoryIdAction(categoryId),
  });
};
