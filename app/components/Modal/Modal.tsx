'use client';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import { deletePostAction } from '@/app/server/actions/post';
import { Spinner } from '@/app/components/shared/spinner';

export default function DeleteModal({
  id,
  open,
  handleOpen,
}: {
  id: string;
  open: boolean;
  handleOpen: () => void;
}) {
  const [state, formAction, pending] = useActionState(deletePostAction, {
    success: false,
    message: '',
  });

  useEffect(() => {
    if (state.error) {
      toast.error(state.message);
    }
  }, [state.error, state.message]);

  return (
    <>
      {open ? (
        <div className="fixed inset-0 z-[9999]">
          <button
            type="button"
            aria-label="close"
            onClick={handleOpen}
            className="absolute inset-0 bg-black/40"
          />

          <div className="absolute left-1/2 top-1/2 w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-3 shadow-xl outline-none">
            <form action={formAction}>
              <input type="hidden" name="id" value={id} />
              <div className="text-lg font-bold text-black">잠시만요, 확인해주세요!</div>
              <div className="mt-1 text-sm font-medium text-black">
                작성하신 게시글이 삭제돼요.
                <br />
                확실하신가요?
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleOpen}
                  className="flex h-10 w-[140px] items-center justify-center rounded-lg bg-[#D9D9D9] font-semibold text-black"
                >
                  취소
                </button>

                <button
                  type="submit"
                  disabled={pending}
                  className="flex h-10 w-[140px] items-center justify-center rounded-lg bg-[#96C2F7] font-semibold text-white disabled:opacity-60"
                >
                  {pending ? <Spinner className="h-4 w-4 text-white" /> : '삭제'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
