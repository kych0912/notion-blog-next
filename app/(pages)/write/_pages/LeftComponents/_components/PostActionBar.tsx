"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { getPageContentBlockIds } from "notion-utils";
import { useFormState, useFormStatus } from "react-dom";

import { useNotionPage } from "@/app/context/NotionPageContext";
import { ContainedButton } from "@/app/components/Button/button.styles";
import type { WriteActionState } from "@/app/(pages)/write/actions";

import {
  PostActionBarContainer,
  PostActionBarButtonContainer,
  PostActionBarWrapper,
} from "../../../write.styles";

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <ContainedButton size="small" type="submit" disabled={disabled || pending}>
      <Typography>
        {pending ? <CircularProgress size={16} color="inherit" /> : "작성"}
      </Typography>
    </ContainedButton>
  );
}

export default function PostActionBar({
  onWrite,
}: {
  onWrite: (
    state: WriteActionState,
    formData: FormData
  ) => Promise<WriteActionState>;
}) {
  const router = useRouter();
  const { recordMap } = useNotionPage();

  const initialState: WriteActionState = { ok: false };
  const [state, formAction] = useFormState(onWrite, initialState);

  let pageId: string | undefined;
  if (recordMap) {
    const blockIds = getPageContentBlockIds(recordMap);
    pageId = blockIds[0];
  }

  const disabled = !recordMap || !pageId;

  return (
    <PostActionBarContainer>
      <PostActionBarWrapper>
        <PostActionBarButtonContainer
          onClick={() => {
            router.push("/");
          }}
        >
          <ArrowBackIcon sx={{ mr: 1 }} />
          <Typography>뒤로가기</Typography>
        </PostActionBarButtonContainer>

        <form action={formAction}>
          <input type="hidden" name="pageId" value={pageId ?? ""} />
          <SubmitButton disabled={disabled} />
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
