import { useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getPostCategoryOptions } from '@/app/react-query/options/category';

import { useCreateCategory } from './_internal/useCreateCategory';
import { useDeleteCategory } from './_internal/useDeleteCategory';
import { useRemovePostCategory } from './_internal/useRemoveCategory';

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
  const queryClient = useQueryClient();
  const createMutation = useCreateCategory({ postId });
  const postCategoriesQuery = useQuery(getPostCategoryOptions(postId));
  const deleteMutation = useDeleteCategory();
  const removePostCategoryMutation = useRemovePostCategory({ postId });

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

  // 카테고리 자체 삭제
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

  // 게시글에서 카테고리 제거(연결 해제)
  const handleRemovePostCategory = useCallback(() => {
    removePostCategoryMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getPostCategoryOptions(postId).queryKey });
      },
    });
  }, [removePostCategoryMutation, postId, queryClient]);

  return {
    createMutation,
    handleDeleteCategory,
    handleRemovePostCategory,
    postCategoriesQuery,
    filteredCategories,
    showCreateNew,
  };
}
