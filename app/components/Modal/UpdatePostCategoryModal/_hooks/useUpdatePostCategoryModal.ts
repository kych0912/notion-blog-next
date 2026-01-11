import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import {
  getAllCategoriesOptions,
  getPostCategoryOptions,
} from '@/app/react-query/options/category';

import { useAddPostCategory } from './_internal/useAddPostCategory';

export function useAttachPostCategoryModal({
  postId,
  onClose,
}: {
  postId: string;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const userName = session?.user?.name || undefined;
  const allCategoriesQuery = useQuery({
    ...getAllCategoriesOptions(userName),
    enabled: status === 'authenticated' && !!session?.user?.name,
  });
  const { mutate: attachPostCategory, isPending: isAttachingPostCategory } = useAddPostCategory({
    postId,
    onSuccess: onClose,
  });

  const handleAttachPostCategory = useCallback(
    (categoryId: string | null) => {
      attachPostCategory(categoryId, {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries({ queryKey: getPostCategoryOptions(postId).queryKey });
        },
      });
    },
    [attachPostCategory, onClose, queryClient, postId],
  );

  return {
    allCategoriesQuery,
    handleAttachPostCategory,
    isAttachingPostCategory,
  };
}
