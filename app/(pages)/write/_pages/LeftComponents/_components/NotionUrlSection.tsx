'use client'

import React, { useEffect } from 'react';
import Input from "./Input";
import Information from "./Information";
import ErrorHandler from "@/app/components/Error/ErrorHandler";
import { useNotionUrlValidation } from "@/app/hooks/write/useNotionValidation";

const NotionUrlSection = React.memo(function NotionUrlSection() {
    const {url, setUrl, isError, handleSubmit, resetError} = useNotionUrlValidation(); 
    return(
        <>
            <div>
                <Input 
                    url={url} 
                    setUrl={setUrl} 
                    isError={isError}
                    handleSubmit={handleSubmit}
                />
                {
                    isError &&
                    <ErrorHandler 
                        message="유효하지 않은 Notion URL입니다." 
                        type="helperText"
                        resetError={resetError}
                    />
                }
                <Information/>
            </div>
        </>
    )
});

export default NotionUrlSection; 