import { useState, useEffect } from "react";
import { getPage } from "@/app/lib/notion-api";
import { ExtendedRecordMap } from "notion-types";
import NotionPage from "@/app/components/NotionPage";


async function Post({params}: {params:{id:string}}){    
    const recordMap = await getPage('067dd719a912471ea9a3ac10710e7fdf');

    return(
        <>
            <NotionPage recordMap={recordMap} rootId={'067dd719a912471ea9a3ac10710e7fdf'}/>
        </>
    )
}

export default Post;