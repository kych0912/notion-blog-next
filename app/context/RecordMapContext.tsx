'use client'

import { createContext } from "react";
import { ExtendedRecordMap } from "notion-types";

interface IRecordMapContext{
    recordMap:ExtendedRecordMap|null,
    isLoading:boolean
}

export const RecordMapContext = createContext<IRecordMapContext>({
    recordMap:null,
    isLoading:false
});