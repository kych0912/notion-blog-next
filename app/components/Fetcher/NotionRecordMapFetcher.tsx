'use client'

import React from "react";
import { useEffect } from "react";
import { useRecordMapFetch } from "@/app/react-query/post/queries";
import { ExtendedRecordMap } from "notion-types";
import { useNotionPage } from "@/app/context/NotionPageContext";
import LoadingPage from "../LoadingPage";

//데이터 fetching
//상태관리
//상태 분기 처리
function NotionRecordMapFetcher({children}:{
    children:React.ReactNode,
}) {

    const {setRecordMap, pageId} = useNotionPage();
    const {data, isLoading, error, isRefetching} = useRecordMapFetch(pageId as string);

    //데이터 저장
    useEffect(()=>{
        if(data) setRecordMap(data);
    },[data,setRecordMap])

    if(isLoading || isRefetching) return <LoadingPage/>;

    //에러 처리
    if(error) {
        setRecordMap(null);
        throw error;
    }

    return children;
}

export default NotionRecordMapFetcher;