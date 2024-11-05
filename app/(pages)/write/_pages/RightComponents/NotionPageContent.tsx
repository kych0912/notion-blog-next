import { getPage } from "@/app/lib/notion-api";
import { Box } from "@mui/material"; 
import PreRender from "./PreRender";

export default async function NotionPageContent({
    pageId
  }: {
    pageId?:string
  }) {

    if(!pageId){
        return null;
    }

    const recordMap = await getPage(pageId);

    return (    
        <Box sx={{
            height:"100%",  
            width:"100%",   
            overflowY:"auto",
        }}>
        {
            recordMap?
            <PreRender recordMap={recordMap}/>
            :
            <>
            </>
        }
        </Box>
    );
    }