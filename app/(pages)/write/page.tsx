import NotionPageContent from "./_pages/RightComponents/NotionPageContent";
import NotionUrlInput from "./_pages/LeftComponents/NotionUrlInput";
import ApiErrorBoundary from "@/app/components/Error/APIErrorBoundary";
import NotionRecordMapFetcher from "@/app/components/Fetcher/NotionRecordMapFetcher";

export default function Page({searchParams}:{searchParams:{pageId:string}}){

    const {pageId} = searchParams;

    //레이아웃 구성
    return(
        <>

            <NotionUrlInput />

            <ApiErrorBoundary>
                <NotionRecordMapFetcher pageId={pageId}>
                    <NotionPageContent/>   
                </NotionRecordMapFetcher>
            </ApiErrorBoundary>
        </>
    )
}