'use client'

import { Box } from "@mui/material"; 
import PreRender from "./PreRender";
import { WriteFunnelContainer } from "../../write.styles";
import NotionRecordMapFetcher from "@/app/components/Fetcher/NotionRecordMapFetcher";
import ApiErrorBoundary from "@/app/components/Error/APIErrorBoundary";

export default function NotionPageContent({pageId}:{pageId:string}) {


    return (    
        <WriteFunnelContainer>  
            <Box sx={{
                width:"100%",   
                height:"100%",
                overflowY:"auto",
                pb:"6rem"
            }}>
                <ApiErrorBoundary>
                    <NotionRecordMapFetcher pageId={pageId}>
                        <PreRender/>
                    </NotionRecordMapFetcher>
                </ApiErrorBoundary>
            </Box>
        </WriteFunnelContainer>
    );
    }