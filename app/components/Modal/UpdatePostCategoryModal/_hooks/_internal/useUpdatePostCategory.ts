import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getAllCategoriesOptions,
  getPostCategoryOptions,
} from '@/app/react-query/options/category';
import { updatePostCategoryAction } from '@/app/server/actions/category';

export function useUpdatePostCategory({
  postId,
  onSuccess,
}: {
  postId: string;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoryId: string | null) => {
      return updatePostCategoryAction(postId, categoryId);
    },
    onSuccess: (result) => {
      if (result.ok) {
        queryClient.invalidateQueries({ queryKey: getPostCategoryOptions(postId).queryKey });
        queryClient.invalidateQueries({ queryKey: getAllCategoriesOptions().queryKey });
        toast.success(result.message);
        onSuccess?.();
      } else {
        toast.error(result.message);
      }
    },
    onError: () => {
      toast.error('카테고리 변경 중 오류가 발생했습니다.');
    },
  });
}
