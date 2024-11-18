'use client'

import { Box } from "@mui/material"; 
import PreRender from "./_components/PreRender";
import { WriteFunnelContainer } from "../../write.styles";
import NotionRecordMapFetcher from "@/app/components/Fetcher/NotionRecordMapFetcher";
import FetchErrorBoundary from "@/app/components/Error/FetchErrorBoundary";
import { useNotionPage } from "@/app/context/NotionPageContext";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

//UI 렌더링
export default function NotionPageContent() {
    const { setPageId } = useNotionPage();
    const searchParams = useSearchParams();
    const pageId = searchParams.get("pageId");

    useEffect(()=>{
        if(pageId) setPageId(pageId);
    },[pageId]);

    return (    
        <WriteFunnelContainer>  
            <Box sx={{
                width:"100%",   
                height:"100%",
                overflowY:"auto",
                pb:"6rem"
            }}>
                <FetchErrorBoundary key={pageId || undefined}>
                    <NotionRecordMapFetcher>
                        <PreRender/>
                    </NotionRecordMapFetcher>
                </FetchErrorBoundary>
            </Box>
        </WriteFunnelContainer>
    );
}