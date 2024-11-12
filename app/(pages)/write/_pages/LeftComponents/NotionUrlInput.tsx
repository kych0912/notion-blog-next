'use client'

import NotionPageContainer from "./_components/NotionPageContainer";
import { useState} from 'react'
import { useRouter } from 'next/navigation';
import { parsePageId } from "notion-utils";
import Input from "./_components/Input";
import Information from "./_components/Information";
import ErrorHandler from "@/app/components/Error/ErrorHandler";
import { useNotionUrlValidation } from "@/app/hooks/write/useNotionValidation";

export default function NotionUrlInput(){
        
    const {url, setUrl, error, handleSubmit, resetError} = useNotionUrlValidation();    

    return(
        <>
            <NotionPageContainer>
                <Input url={url} setUrl={setUrl} handleSubmit={handleSubmit}/>

                <Information/>
            </NotionPageContainer>

            {
                error && 
                <ErrorHandler 
                    message="유효하지 않은 Notion URL입니다." 
                    type="snackbar" 
                    resetError={resetError}
                />
            }
        </>
    )
}