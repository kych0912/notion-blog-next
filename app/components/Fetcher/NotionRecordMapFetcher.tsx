'use client'

import React from "react";
import { useEffect } from "react";
import { useRecordMapFetch } from "@/app/react-query/post/queries";
import { useNotionPage } from "@/app/context/NotionPageContext";
import LoadingPage from "../LoadingPage";
import { useError } from "@/app/context/ErrorContext";
import { useFeedback } from "@/app/context/FeedbackContext";

//데이터 fetching
//상태관리
//상태 분기 처리
function NotionRecordMapFetcher({children, pageId}:{
    children:React.ReactNode,
    pageId:string
}) {

    const {setError} = useError();
    const {setMessageState} = useFeedback();
    const {setRecordMap,setIsLoading} = useNotionPage();
    const {data, isLoading, error} = useRecordMapFetch(pageId as string);

    //데이터 저장
    useEffect(()=>{
        if(data) {
            setRecordMap(data);
            setMessageState("성공적으로 불러왔습니다.", 'success', 'snackbar');
        }

        return () => {
            setRecordMap(null);
        }
    },[data,setRecordMap])

    //로딩 상태 관리
    useEffect(()=>{
        setIsLoading(isLoading);
    },[isLoading,setIsLoading])
    
    //로딩중일 땐 LoadingPage 렌더링
    if(isLoading){
        return <LoadingPage/>;
    }

    if(error){
        setIsLoading(false);
        setError(error);
        throw error;
    }

    return children;
}

export default NotionRecordMapFetcher;