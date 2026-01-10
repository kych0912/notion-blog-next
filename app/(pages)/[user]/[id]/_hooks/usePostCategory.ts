import { useQuery } from '@tanstack/react-query';

import { getPostCategoryOptions } from '@/app/react-query/options/category';

import { usePostContext } from '../_contexts/usePostContext';

export function usePostCategory() {
  const { id } = usePostContext();
  const { data: currentCategory } = useQuery(getPostCategoryOptions(id));
  const categoryName = currentCategory?.category?.name ?? null;

  return { categoryName };
}
