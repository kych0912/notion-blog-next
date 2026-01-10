import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getAllCategoriesOptions,
  getPostCategoryOptions,
} from '@/app/react-query/options/category';

import { useUpdatePostCategory } from './_internal/useUpdatePostCategory';

export function useUpdatePostCategoryModal({
  postId,
  onClose,
}: {
  postId: string;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const allCategoriesQuery = useQuery(getAllCategoriesOptions());
  const { mutate: updatePostCategory, isPending: isUpdatingPostCategory } = useUpdatePostCategory({
    postId,
    onSuccess: onClose,
  });

  const handleUpdatePostCategory = useCallback(
    (categoryId: string | null) => {
      updatePostCategory(categoryId, {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries({ queryKey: getPostCategoryOptions(postId).queryKey });
        },
      });
    },
    [updatePostCategory, onClose, queryClient, postId],
  );

  return {
    allCategoriesQuery,
    handleUpdatePostCategory,
    isUpdatingPostCategory,
  };
}
