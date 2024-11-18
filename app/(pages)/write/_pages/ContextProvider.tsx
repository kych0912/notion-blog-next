import { NotionPageProvider } from "@/app/context/NotionPageContext";

export default function ContextProvider({children}:{children:React.ReactNode}){

    return <NotionPageProvider>{children}</NotionPageProvider>
}