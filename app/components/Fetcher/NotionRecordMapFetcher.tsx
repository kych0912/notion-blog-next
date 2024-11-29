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
function NotionRecordMapFetcher({children, pageId}:{
    children:React.ReactNode,
    pageId:string
}) {

    const {setRecordMap} = useNotionPage();
    const {data, isLoading, isRefetching, error} = useRecordMapFetch(pageId as string);

    //데이터 저장
    useEffect(()=>{
        if(data) setRecordMap(data);
    },[data,setRecordMap])

    //에러 발생시 상태 초기화
    if(error){
        setRecordMap(null);
        throw error;
    }

    if(isLoading || isRefetching) return <LoadingPage/>;

    return children;
}

export default NotionRecordMapFetcher;