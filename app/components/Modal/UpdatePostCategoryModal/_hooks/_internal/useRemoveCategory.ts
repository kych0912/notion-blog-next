import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { removePostCategoryAction } from '@/app/server/actions/category';
import { getPostCategoryOptions } from '@/app/react-query/options/category';

/**
 * 게시글에서 카테고리를 "제거"하는 훅
 * - 카테고리 자체를 삭제하는 훅(`useDeleteCategory`)과는 역할이 다릅니다.
 */
export function useRemovePostCategory({ postId }: { postId: string }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return removePostCategoryAction(postId);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: getPostCategoryOptions(postId).queryKey });
      const previousPostCategory = queryClient.getQueryData(
        getPostCategoryOptions(postId).queryKey,
      );

      queryClient.setQueryData(getPostCategoryOptions(postId).queryKey, undefined);

      return { previousPostCategory };
    },
    onSuccess: (result) => {
      if (result.ok) {
        queryClient.invalidateQueries({ queryKey: getPostCategoryOptions(postId).queryKey });
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    },
    onError: (_err, _vars, context) => {
      if (context?.previousPostCategory !== undefined) {
        queryClient.setQueryData(
          getPostCategoryOptions(postId).queryKey,
          context.previousPostCategory,
        );
      }
      toast.error('카테고리 제거 중 오류가 발생했습니다.');
    },
  });
}
