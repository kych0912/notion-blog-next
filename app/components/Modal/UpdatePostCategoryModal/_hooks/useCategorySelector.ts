import { useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getPostCategoryOptions } from '@/app/react-query/options/category';

import { useCreateCategory } from './_internal/useCreateCategory';
import { useDeleteCategory } from './_internal/useDeleteCategory';

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
  const deleteMutation = useDeleteCategory();
  const queryClient = useQueryClient();

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [categories, search]);

  const isCategoryExists = filteredCategories.some(
    (c) => c.name.toLowerCase() === search.toLowerCase(),
  );
  const isCategoryNotFound = filteredCategories.length === 0;
  const isSearchEmpty = !search.trim();

  const showCreateNew = !isSearchEmpty && (isCategoryNotFound || !isCategoryExists);

  const handleDeleteCategory = useCallback(
    (categoryId: string) => {
      deleteMutation.mutate(categoryId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getPostCategoryOptions(postId).queryKey });
        },
      });
    },
    [deleteMutation, postId],
  );

  return {
    createMutation,
    handleDeleteCategory,
    postCategoriesQuery,
    filteredCategories,
    showCreateNew,
  };
}
