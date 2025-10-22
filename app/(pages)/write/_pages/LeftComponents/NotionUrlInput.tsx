"use client";

import NotionInputPageContainer from "./_components/NotionInputPageContainer";
import PostActionBar from "./_components/PostActionBar";
import NotionUrlSection from "./_components/NotionUrlSection";
import type { WriteActionState } from "@/app/(pages)/write/actions";

export default function NotionUrlInput({
  onWrite,
}: {
  onWrite: (
    state: WriteActionState,
    formData: FormData
  ) => Promise<WriteActionState>;
}) {
  return (
    <NotionInputPageContainer>
      <NotionUrlSection />
      <PostActionBar onWrite={onWrite} />
    </NotionInputPageContainer>
  );
}
