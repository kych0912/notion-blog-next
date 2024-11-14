'use client'

import React from "react";
import { useEffect } from "react";
import { useRecordMapFetch } from "@/app/react-query/post/queries";
import { RecordMapContext } from "@/app/context/RecordMapContext";
import { ExtendedRecordMap } from "notion-types";

//데이터 fetching
//상태관리
//상태 분기 처리
function NotionRecordMapFetcher({children, pageId}:{
    children:React.ReactNode,
    pageId:string 
}) {

    const {data, isLoading, error, isRefetching,refetch} = useRecordMapFetch(pageId);
    const [recordMap, setRecordMap] = React.useState<ExtendedRecordMap | null>(null);

    useEffect(()=>{
        if(pageId) refetch();
    },[pageId,refetch])

    useEffect(()=>{
        if(data) setRecordMap(data);
    },[data,setRecordMap])

    if(error) throw error;

    return (
        <RecordMapContext.Provider value={{recordMap:recordMap, isLoading:isLoading || isRefetching}}>
            {children}
        </RecordMapContext.Provider>
    );
}

export default NotionRecordMapFetcher;