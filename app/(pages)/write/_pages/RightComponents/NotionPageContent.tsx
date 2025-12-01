"use client";

import { Box } from "@mui/material";
import PreRender from "./_components/PreRender";
import { WriteFunnelContainer } from "../../write.styles";
import NotionRecordMapFetcher from "@/app/components/Fetcher/NotionRecordMapFetcher";
import FallbackErrorBoundary from "@/app/components/Error/FallbackErrorBoundary";
import { useSearchParams } from "next/navigation";

//UI 렌더링
export default function NotionPageContent() {
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");
  const timestamp = searchParams.get("timestamp");

  return (
    <WriteFunnelContainer>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          pb: "6rem",
        }}
      >
        <FallbackErrorBoundary key={`${pageId}-${timestamp}` || undefined}>
          <NotionRecordMapFetcher pageId={pageId as string}>
            <PreRender />
          </NotionRecordMapFetcher>
        </FallbackErrorBoundary>
      </Box>
    </WriteFunnelContainer>
  );
}
