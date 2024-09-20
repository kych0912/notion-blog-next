import NotionPageContainer from "./_pages/NotionPageContainer"
import NotionPageContent from "./_pages/NotionPagecontent";
import { Suspense } from "react";
import {
    WriteFunnelContainer
} from "./write.styles";


export default function Page({searchParams}:{
    searchParams:{url?:string}
}){

    return(
        <>

            <NotionPageContainer>
                {/* NotionPageContainer에 왼쪽 퍼널이 포함되어 있음 */}

                <WriteFunnelContainer>
                    <Suspense fallback={<div>Loading...</div>}>
                        <NotionPageContent
                            url={searchParams.url}
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