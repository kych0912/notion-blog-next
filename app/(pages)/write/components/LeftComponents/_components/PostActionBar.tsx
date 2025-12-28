'use client';

import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { ContainedButton } from '@/app/components/Button/button.styles';
import { Spinner } from '@/app/components/shared/spinner';
import type { WriteActionState } from '@/app/(pages)/write/actions';
import { writePostAction } from '@/app/(pages)/write/actions';

import {
  PostActionBarContainer,
  PostActionBarButtonContainer,
  PostActionBarWrapper,
} from '../../../write.styles';
import { usePageId } from '../../../hooks/usePageIdContext';

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <ContainedButton size="small" type="submit" disabled={disabled || pending}>
      {pending ? <Spinner className="h-4 w-4 text-white" /> : '작성'}
    </ContainedButton>
  );
}

export default function PostActionBar() {
  const router = useRouter();
  const { pageId } = usePageId();
  const initialState: WriteActionState = { ok: false };
  const [state, formAction] = useActionState(writePostAction, initialState);

  return (
    <PostActionBarContainer>
      <PostActionBarWrapper>
        <PostActionBarButtonContainer
          onClick={() => {
            router.push('/');
          }}
        >
          <ArrowLeftIcon className="mr-1 text-gray-800" />
          <span className="text-sm font-medium text-gray-800">뒤로가기</span>
        </PostActionBarButtonContainer>

        <form action={formAction}>
          <input type="hidden" name="pageId" value={pageId ?? ''} />
          <SubmitButton disabled={!pageId} />
        </form>
      </PostActionBarWrapper>

      {state?.message && <p className="mt-1 px-4 text-sm text-red-600">{state.message}</p>}
    </PostActionBarContainer>
  );
}
