import { queryOptions } from '@tanstack/react-query';

import {
  getUserPostCategoriesAction,
  getPostCategoriesAction,
  getAllCategoriesAction,
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

export const getAllCategoriesOptions = () => {
  return queryOptions({
    queryKey: ['all-categories'],
    queryFn: () => getAllCategoriesAction(),
  });
};
