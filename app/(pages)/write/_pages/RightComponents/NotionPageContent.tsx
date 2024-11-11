'use client'

import { Box } from "@mui/material"; 
import PreRender from "./PreRender";
import { WriteFunnelContainer } from "../../write.styles";
import NotionRecordMapFetcher from "@/app/components/Fetcher/NotionRecordMapFetcher";
import { useRecordMapFetch } from "@/app/react-query/post/queries"
import { useEffect } from "react";


export default function NotionPageContent({pageId}:{pageId:string}) {
    const fetchState = useRecordMapFetch(pageId);

    useEffect(()=>{
        fetchState.refetch();
    },[pageId])

    return (    
        <WriteFunnelContainer>  
            <Box sx={{
                width:"100%",   
                height:"100%",
                overflowY:"auto",
                pb:"6rem"
            }}>
                <NotionRecordMapFetcher fetchState={fetchState}>
                    {
                        fetchState.data?
                        <PreRender recordMap={fetchState.data}/>
                        :
                        <>
                        </>
                    }
                </NotionRecordMapFetcher>
            </Box>
        </WriteFunnelContainer>
    );
    }