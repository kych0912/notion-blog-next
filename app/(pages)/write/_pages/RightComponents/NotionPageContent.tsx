'use client'

import { Box } from "@mui/material"; 
import PreRender from "./PreRender";
import { WriteFunnelContainer } from "../../write.styles";
import { RecordMapContext } from "@/app/context/RecordMapContext";
import { useContext } from "react";
import LoadingPage from "@/app/components/LoadingPage";

//UI 렌더링
export default function NotionPageContent() {

    const {recordMap, isLoading} = useContext(RecordMapContext);

    return (    
        <WriteFunnelContainer>  
            <Box sx={{
                width:"100%",   
                height:"100%",
                overflowY:"auto",
                pb:"6rem"
            }}>
                {isLoading ? <LoadingPage/> : <PreRender recordMap={recordMap}/>}
            </Box>
        </WriteFunnelContainer>
    );
    }