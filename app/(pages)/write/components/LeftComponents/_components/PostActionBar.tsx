'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useQuery } from '@tanstack/react-query';

import type { WriteActionState } from '@/app/(pages)/write/actions';
import { writePostAction } from '@/app/(pages)/write/actions';
import { getRecordMapOptions } from '@/app/react-query/options/notion';

import { PostActionBarContainer, PostActionBarWrapper } from '../../../write.styles';
import { usePageId } from '../../../hooks/usePageIdContext';

const initialState: WriteActionState = { ok: false };
const messages: Record<string, string> = {
  'Invalid Notion URL': 'Notion 주소와 웹 게시 여부를 확인한 뒤 다시 불러와 주세요.',
  'Token Not Found': '다시 로그인한 뒤 발행해 주세요.',
  'Invalid Token': '로그인 정보를 확인하지 못했어요. 다시 로그인해 주세요.',
  'Post Already Exists': '이미 발행한 글이에요. 다른 Notion 페이지를 불러와 주세요.',
};

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="write-button write-button--primary"
      disabled={disabled || pending}
      aria-busy={pending || undefined}
    >
      {pending ? '발행 중…' : '발행하기'}
    </button>
  );
}

export default function PostActionBar() {
  const { pageId } = usePageId();
  const {
    data: recordMap,
    isFetching,
    isError,
  } = useQuery({
    ...getRecordMapOptions(pageId),
    throwOnError: false,
  });
  const [state, formAction, pending] = useActionState(writePostAction, initialState);
  const [submittedPageId, setSubmittedPageId] = useState<string | null>(null);
  const canPublish =
    !!pageId && !!recordMap?.isSuccess && !!recordMap.data && !isFetching && !isError;
  const errorMessage =
    state.message && submittedPageId === pageId && !pending
      ? (messages[state.message] ?? '발행하지 못했어요. 잠시 후 다시 시도해 주세요.')
      : null;

  return (
    <PostActionBarContainer>
      <PostActionBarWrapper>
        <Link href="/" prefetch={false} className="write-back">
          뒤로가기
        </Link>
        <form
          action={formAction}
          className="write-publish-form"
          onSubmit={() => setSubmittedPageId(pageId)}
        >
          <input type="hidden" name="pageId" value={pageId ?? ''} />
          <SubmitButton disabled={!canPublish} />
          <p
            className={`write-publish-feedback write-feedback${errorMessage ? ' write-feedback--error' : ''}`}
            role={errorMessage ? 'alert' : undefined}
          >
            {errorMessage ??
              (canPublish
                ? '미리보기를 확인했다면 발행해 주세요.'
                : '페이지를 불러온 뒤 발행할 수 있어요.')}
          </p>
        </form>
      </PostActionBarWrapper>
    </PostActionBarContainer>
  );
}
