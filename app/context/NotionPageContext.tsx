'use client'

import { createContext, useContext, useState, useEffect } from "react";
import { ExtendedRecordMap } from "notion-types";


interface IRecordMapContext {
    recordMap: ExtendedRecordMap | null;
    isLoading: boolean;
    pageId: string | undefined;
    setRecordMap: (recordMap: ExtendedRecordMap | null) => void;
    setIsLoading: (isLoading: boolean) => void;
    setPageId: (pageId: string | undefined) => void;
}

const NotionPageContext = createContext<IRecordMapContext | undefined>(undefined);

export function NotionPageProvider({ children }: { children: React.ReactNode }) {
    const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
    const [pageId, setPageId] = useState<string | undefined>(undefined);    
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // cleanup 함수
        return () => {
            setRecordMap(null);
            setPageId(undefined);
            setIsLoading(false);
        };
    }, []); 

    return (
        <NotionPageContext.Provider 
            value={{
                recordMap,
                isLoading,
                pageId,
                setRecordMap,
                setIsLoading,
                setPageId
            }}
        >
            {children}
        </NotionPageContext.Provider>
    );
}

// 커스텀 훅으로 context 사용
export function useNotionPage() {
    const context = useContext(NotionPageContext);
    if (context === undefined) {
        throw new Error('useNotionPage 사용 시 NotionPageProvider 내부에서 사용해야 합니다.');
    }
    return context;
}