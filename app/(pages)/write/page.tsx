import NotionPageContent from "./_pages/RightComponents/NotionPageContent";
import NotionUrlInput from "./_pages/LeftComponents/NotionUrlInput";

export default async function Page({searchParams}:{searchParams:{pageId:string}}){

    return(
        <>
            <NotionUrlInput/>

            <NotionPageContent pageId={searchParams.pageId}/>   
        </>
    )
}