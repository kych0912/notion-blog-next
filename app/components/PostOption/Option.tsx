'use client';
import React from 'react';
import { MoreVertical } from 'lucide-react';

import { DeleteModal } from '../Modal/Modal';
import { UpdatePostCategoryModal } from '../Modal/UpdatePostCategoryModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../shared/dropdown-menu';

export default function Option({ id }: { id: string }) {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [categoryOpen, setCategoryOpen] = React.useState(false);

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="text-sm font-semibold">
            <MoreVertical className="size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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
