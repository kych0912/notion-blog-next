'use client'

import React from "react";
import { useEffect } from "react";
import LoadingPage from "../LoadingPage";
import { useRecordMapFetch } from "@/app/react-query/post/queries";
import { useRecoilState } from "recoil";
import { recordMapState } from "@/app/store";

function NotionRecordMapFetcher({children, pageId}:{
    children:React.ReactNode,
    pageId:string 
}) {

    const {data, isLoading, error, isRefetching,refetch} = useRecordMapFetch(pageId);
    const [recordMap, setRecordMap] = useRecoilState(recordMapState);

    useEffect(()=>{
        if(pageId) refetch();
    },[pageId])

    useEffect(()=>{
        if(data) setRecordMap(data);
    },[data])

    if(isLoading || isRefetching) return <LoadingPage/>;

    if(error) throw error;

    return children;    
}

export default NotionRecordMapFetcher;