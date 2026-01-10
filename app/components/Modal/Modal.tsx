'use client';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import { deletePostAction } from '@/app/server/actions/post';
import { Spinner } from '@/app/components/shared/spinner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/app/components/shared/dialog';

export function DeleteModal({
  id,
  open,
  onOpenChange,
}: {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [state, formAction, pending] = useActionState(deletePostAction, {
    ok: false,
    message: '',
  });

  useEffect(() => {
    if (state.ok) {
      toast.error(state.message);
    }
  }, [state.ok, state.message]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[350px] p-3">
        <form action={formAction}>
          <input type="hidden" name="id" value={id} />
          <DialogTitle className="text-lg font-bold">잠시만요, 확인해주세요!</DialogTitle>
          <DialogDescription className="mt-1 text-sm font-medium text-card-foreground">
            작성하신 게시글이 삭제돼요.
            <br />
            확실하신가요?
          </DialogDescription>

          <div className="mt-3 flex items-center justify-between">
            <DialogClose asChild>
              <button
                type="button"
                className="flex h-10 w-[140px] items-center justify-center rounded-lg bg-secondary font-semibold text-secondary-foreground hover:brightness-95"
              >
                취소
              </button>
            </DialogClose>

            <button
              type="submit"
              disabled={pending}
              className="flex h-10 w-[140px] items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground hover:brightness-95 disabled:opacity-60"
            >
              {pending ? <Spinner className="h-4 w-4 text-primary-foreground" /> : '삭제'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
