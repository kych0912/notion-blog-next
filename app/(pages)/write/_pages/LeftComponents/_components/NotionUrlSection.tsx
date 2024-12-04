'use client'

import React, { useEffect } from 'react';
import Input from "./Input";
import Information from "./Information";
import ErrorHandler from "@/app/components/Error/ErrorHandler";
import { useNotionUrlValidation } from "@/app/hooks/write/useNotionValidation";
import { Box } from '@mui/material';

const NotionUrlSection = React.memo(function NotionUrlSection() {
    const {url, setUrl, isError, handleSubmit, resetError} = useNotionUrlValidation(); 
    return(
        <>
            <Box sx={{width:"100%"}}>
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
            </Box>
        </>
    )
});

export default NotionUrlSection; 