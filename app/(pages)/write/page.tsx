import NotionUrlInput from "./_pages/LeftComponents/NotionUrlInput";
import NotionPageContent from "./_pages/RightComponents/NotionPageContent";

// 서버 컴포넌트로 유지
export default function Page(){
    return(
        <>
            <NotionUrlInput/>
            <NotionPageContent/>
        </>
    )
}