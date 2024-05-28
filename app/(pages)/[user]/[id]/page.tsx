import { useState, useEffect } from "react";
import { getPage } from "@/app/lib/notion-api";
import { ExtendedRecordMap } from "notion-types";
import { Box } from "@mui/material";
import NotionPage from "@/app/components/PostDetail/Post";


async function Post({params}: {params:{id:string,user:string}}){    
    const id = params.id;
    const rootDomain = `/${params.user}/${id}`

    const recordMap = await getPage(id);
    

    return(
        <>
            <NotionPage recordMap={recordMap} rootDomain={rootDomain} rootPageId={id} user={params.user}/>
        </>
    )
}

export default Post;