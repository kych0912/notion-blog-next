import { Suspense } from "react";
import NotionUrlInput from "./_pages/LeftComponents/NotionUrlInput";
import NotionPageContent from "./_pages/RightComponents/NotionPageContent";
import GlobalErrorBoundary from "@/app/components/Error/GlobalErrorBoundary";
import ErrorCatcher from "@/app/components/Error/ErrorCatcher";
import FeedbackCatcher from "@/app/components/Feedback/FeedbackCatcher";
import { writePostAction } from "@/app/(pages)/write/actions";

export default function Page() {
  return (
    <GlobalErrorBoundary>
      <ErrorCatcher />
      <FeedbackCatcher />

      <NotionUrlInput onWrite={writePostAction} />

      <Suspense>
        <NotionPageContent />
      </Suspense>
    </GlobalErrorBoundary>
  );
}
