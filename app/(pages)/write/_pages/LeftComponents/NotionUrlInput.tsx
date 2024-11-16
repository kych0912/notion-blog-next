'use client'

import NotionInputPageContainer from "./_components/NotionInputPageContainer";
import Input from "./_components/Input";
import Information from "./_components/Information";
import ErrorHandler from "@/app/components/Error/ErrorHandler";
import { useNotionUrlValidation } from "@/app/hooks/write/useNotionValidation";
import PostActionBar from "./PostActionBar";

export default function NotionUrlInput() {
    const {url, setUrl, isError, handleSubmit, resetError} = useNotionUrlValidation(); 

    return(
        <>
            <NotionInputPageContainer>
                <div>
                    <Input 
                        url={url} 
                        setUrl={setUrl} 
                        handleSubmit={handleSubmit}
                    />
                    <Information/>
                </div>
                <PostActionBar/>
            </NotionInputPageContainer>

            {
                isError && 
                <ErrorHandler 
                    message="유효하지 않은 Notion URL입니다." 
                    type="snackbar" 
                    resetError={resetError}
                />
            }
        </>
    )
}