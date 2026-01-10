import { type MutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getAllCategoriesOptions,
  getPostCategoryOptions,
} from '@/app/react-query/options/category';
import { createCategoryAction } from '@/app/server/actions/category';
import { type ActionState } from '@/app/server/actions/types';

export function useCreateCategory({
  postId,
  onSuccess,
  ...options
}: { postId: string; onSuccess?: () => void } & MutationOptions<
  ActionState<string>,
  Error,
  string,
  unknown
>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      return createCategoryAction(name);
    },
    onSuccess: (result) => {
      if (result.ok) {
        queryClient.invalidateQueries({ queryKey: getAllCategoriesOptions().queryKey });
        queryClient.invalidateQueries({ queryKey: getPostCategoryOptions(postId).queryKey });
        toast.success(result.message);
        onSuccess?.();
      } else {
        toast.error(result.message);
      }
    },
    onError: () => {
      toast.error('카테고리 생성 중 오류가 발생했습니다.');
    },
    ...options,
  });
}
