'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/app/components/shared/dialog';
import { Button } from '@/app/components/shared/button';
import { Spinner } from '@/app/components/shared/spinner';
import { CategorySelector } from '@/app/components/Modal/UpdatePostCategoryModal/_components/CategorySelector';

import { useAttachPostCategoryModal } from './_hooks/useUpdatePostCategoryModal';

export function UpdatePostCategoryModal({
  open,
  onOpenChange,
  id,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const { allCategoriesQuery, handleAttachPostCategory, isAttachingPostCategory } =
    useAttachPostCategoryModal({
      postId: id,
      onClose: () => onOpenChange(false),
    });
  const { data: allCategories, isLoading: isLoadingAll } = allCategoriesQuery;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[450px] max-w-[90vw]">
        <DialogTitle className="text-lg font-bold">카테고리 설정</DialogTitle>
        <DialogDescription className="text-sm font-medium text-muted-foreground">
          이 게시글의 카테고리를 선택하거나 새로 만들 수 있습니다.
        </DialogDescription>

        {isLoadingAll ? (
          <div className="flex items-center justify-center py-8">
            <Spinner />
            <span className="ml-2 text-sm text-muted-foreground">카테고리 불러오는 중...</span>
          </div>
        ) : (
          <>
            <CategorySelector
              id={id}
              categories={allCategories?.data ?? []}
              selectedCategoryId={selectedCategoryId}
              onCategorySelect={setSelectedCategoryId}
            />
            <div className="mt-4 flex items-center justify-between gap-3">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="flex-1">
                  취소
                </Button>
              </DialogClose>

              <Button
                type="button"
                disabled={isAttachingPostCategory || !selectedCategoryId}
                className="flex-1"
                onClick={() => handleAttachPostCategory(selectedCategoryId)}
              >
                {isAttachingPostCategory ? <Spinner className="text-primary-foreground" /> : '저장'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
