import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteCategoryAction } from '@/app/server/actions/category';
import { getAllCategoriesOptions } from '@/app/react-query/options/category';

import { Category } from '../useCategorySelector';

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoryId: string) => {
      return deleteCategoryAction(categoryId);
    },
    onMutate: async (categoryId: string) => {
      await queryClient.cancelQueries({ queryKey: getAllCategoriesOptions().queryKey });
      const previousCategories = queryClient.getQueryData<Category[]>(
        getAllCategoriesOptions().queryKey,
      );

      queryClient.setQueryData<Category[]>(getAllCategoriesOptions().queryKey, (old) => {
        if (!Array.isArray(old)) return old;
        return old.filter((c) => c.id !== categoryId);
      });
      return { previousCategories };
    },
    onSuccess: (result) => {
      if (result.ok) {
        queryClient.invalidateQueries({ queryKey: getAllCategoriesOptions().queryKey });
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    },
    onError: (_err, _categoryId, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData<Category[]>(
          getAllCategoriesOptions().queryKey,
          context.previousCategories,
        );
      }
      toast.error('카테고리 삭제 중 오류가 발생했습니다.');
    },
  });
}
