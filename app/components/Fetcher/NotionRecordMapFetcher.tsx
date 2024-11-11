'use client'

import React from "react";
import useRecordMapFetch from "@/app/hooks/write/useRecordMapFetch";
import { notionIdState, INotionIdState, recordMapState } from "@/app/store";
import { useRecoilState } from "recoil";
import { ExtendedRecordMap } from "notion-types";
import LoadingPage from "../LoadingPage";
import { UseQueryResult } from "@tanstack/react-query";

function NotionRecordMapFetcher({children, fetchState}:{
    children:React.ReactNode,
    fetchState:UseQueryResult
}) {
    const {data, isLoading, error, isRefetching} = fetchState;

    if(isLoading || isRefetching) return <LoadingPage/>;
    if(error) throw error;

    return children;    
}

export default NotionRecordMapFetcher;