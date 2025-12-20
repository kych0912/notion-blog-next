'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { ContainedButton } from '@/app/components/Button/button.styles';
import type { WriteActionState } from '@/app/(pages)/write/actions';
import { writePostAction } from '@/app/(pages)/write/actions';

import {
  PostActionBarContainer,
  PostActionBarButtonContainer,
  PostActionBarWrapper,
} from '../../../write.styles';
import { usePageId } from '../../../hooks/usePageIdContext';

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <ContainedButton size="small" type="submit" disabled={disabled || pending}>
      <Typography>{pending ? <CircularProgress size={16} color="inherit" /> : '작성'}</Typography>
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
          <ArrowBackIcon sx={{ mr: 1 }} />
          <Typography>뒤로가기</Typography>
        </PostActionBarButtonContainer>

        <form action={formAction}>
          <input type="hidden" name="pageId" value={pageId ?? ''} />
          <SubmitButton disabled={!pageId} />
        </form>
      </PostActionBarWrapper>

      {state?.message && (
        <Typography color="error" sx={{ mt: 1 }}>
          {state.message}
        </Typography>
      )}
    </PostActionBarContainer>
  );
}
