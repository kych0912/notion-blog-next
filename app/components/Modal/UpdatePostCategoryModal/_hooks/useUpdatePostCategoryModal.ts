import { useQuery } from '@tanstack/react-query';

import { getAllCategoriesOptions } from '@/app/react-query/options/category';

import { useUpdatePostCategory } from './useUpdatePostCategory';

export function useUpdatePostCategoryModal({
  postId,
  onClose,
}: {
  postId: string;
  onClose: () => void;
}) {
  const allCategoriesQuery = useQuery(getAllCategoriesOptions());
  const { mutate: updatePostCategory, isPending: isUpdatingPostCategory } = useUpdatePostCategory({
    postId,
    onSuccess: onClose,
  });

  return {
    allCategoriesQuery,
    updatePostCategory,
    isUpdatingPostCategory,
  };
}
