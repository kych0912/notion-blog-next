import NotionPageContainer from "./_pages/NotionPageContainer"
import NotionPageContent from "./_pages/NotionPageContent";
import { Suspense } from "react";
import {
    WriteFunnelContainer
} from "./write.styles";


export default function Page({searchParams}:{
    searchParams:{pageId?:string}
}){


    return(
        <>

            <NotionPageContainer>
                {/* NotionPageContainer에 왼쪽 퍼널이 포함되어 있음. Client Component와 Server Component 사용 위해*/}

                <WriteFunnelContainer>
                    <Suspense fallback={<div>Loading...</div>}>
                        <NotionPageContent
                            pageId={searchParams.pageId}
                        />           
                    </Suspense> 
                </WriteFunnelContainer>    

            </NotionPageContainer>

{/* 
            {
                isPending && 
                <>
                    <Backdrop open={true} sx={{zIndex:2000}}/>
                    <CircularProgress color="primary" sx={{
                        position:"fixed",
                        top:"50%",
                        left:"50%",
                        zIndex:2001,
                    }}/>
                </>
            }

            {
                isError && <ErrorSnackbar message={errorMessage}/>
            } */}

        </>
    )
}