import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getPostCategoryOptions } from '@/app/react-query/options/category';

import { useCreateCategory } from './useCreateCategory';

export interface Category {
  id: string;
  name: string;
}

export function useCategorySelector({
  postId,
  categories,
  search,
}: {
  postId: string;
  categories: Category[];
  search: string;
}) {
  const createMutation = useCreateCategory({ postId });
  const postCategoriesQuery = useQuery(getPostCategoryOptions(postId));

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [categories, search]);

  const showCreateNew = Boolean(search.trim()) && filteredCategories.length === 0;

  return {
    createMutation,
    postCategoriesQuery,
    filteredCategories,
    showCreateNew,
  };
}
