'use client';
import React from 'react';
import { MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { syncPostAction } from '@/app/server/actions/post/sync';

import { DeleteModal } from '../../../Modal/Modal';
import { UpdatePostCategoryModal } from '../../../Modal/UpdatePostCategoryModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../shared/dropdown-menu';

export default function PostOption({ id }: { id: string }) {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [syncing, startSync] = React.useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const sync = () =>
    startSync(async () => {
      const result = await syncPostAction(id);
      if (!result.ok) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['post-detail'] }),
        queryClient.invalidateQueries({ queryKey: ['latest-posts'] }),
      ]);
      router.refresh();
    });

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" aria-label="글 관리" className="p-2 text-sm font-semibold">
            <MoreVertical className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={syncing} onSelect={sync}>
            {syncing ? '동기화 중…' : 'Notion에서 동기화'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setCategoryOpen(true)}>카테고리 변경</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="text-destructive focus:text-destructive"
          >
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdatePostCategoryModal id={id} open={categoryOpen} onOpenChange={setCategoryOpen} />
      <DeleteModal id={id} open={deleteOpen} onOpenChange={setDeleteOpen} />
    </div>
  );
}
