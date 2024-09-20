import NotionPage from "@/app/components/Renderer/NotionPageRenderer"; 
import { getPage } from "@/app/lib/notion-api";
import { Box } from "@mui/material"; 

export default async function NotionPageContent({
    url
  }: {
    url?:string
  }) {

    if(!url){
        return null;
    }
    
    const recordMap = await getPage(url);

    return (
        <Box sx={{
            height:"100%",  
            width:"100%",
            overflowY:"auto",
        }}>
        {
            recordMap?
            <NotionPage 
                user={"none"}
                recordMap={recordMap}
            />
            :
            <>
            </>
        }
        </Box>
    );
    }