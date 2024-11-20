import { Suspense } from "react";
import NotionUrlInput from "./_pages/LeftComponents/NotionUrlInput";
import NotionPageContent from "./_pages/RightComponents/NotionPageContent";
import GlobalErrorBoundary from "@/app/components/Error/GlobalErrorBoundary";

// 서버 컴포넌트로 유지
export default function Page(){
    return(
        <GlobalErrorBoundary>
            <NotionUrlInput/>
            <Suspense>
                <NotionPageContent/>
            </Suspense>
        </GlobalErrorBoundary>
    )
}