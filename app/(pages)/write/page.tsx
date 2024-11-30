import { Suspense } from "react";
import NotionUrlInput from "./_pages/LeftComponents/NotionUrlInput";
import NotionPageContent from "./_pages/RightComponents/NotionPageContent";
import GlobalErrorBoundary from "@/app/components/Error/GlobalErrorBoundary";
import ErrorCatcher from "@/app/components/Error/ErrorCatcher";
import FeedbackCatcher from "@/app/components/Feedback/FeedbackCatcher";

// 서버 컴포넌트로 유지
export default function Page(){
    return(
        <GlobalErrorBoundary>
            <ErrorCatcher/> 
            <FeedbackCatcher/>  
            
            <NotionUrlInput/>

            <Suspense>  
                <NotionPageContent/>
            </Suspense>
        </GlobalErrorBoundary>  
    )
}