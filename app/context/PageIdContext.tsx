import { useContext, createContext, useState } from "react";

interface IPageIdContext{
    pageId:string | undefined;
    setPageId:React.Dispatch<React.SetStateAction<string | undefined>>;
}

const pageIdContext = createContext<IPageIdContext | undefined>(undefined);

export function PageIdProvider({children}:{children:React.ReactNode}){
    const [pageId, setPageId] = useState<string | undefined>(undefined);

    return(
        <pageIdContext.Provider value={{pageId, setPageId}}>    
            {children}
        </pageIdContext.Provider>
    )
}


export function usePageId(){
    const context = useContext(pageIdContext);
    if(!context) throw new Error("usePageId must be used within a PageIdProvider");
    return context;
}   
