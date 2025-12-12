import NotionPage from "@/app/components/Renderer/NotionPageRenderer";
import { useNotionPage } from "@/app/context/NotionPageContext";

import PreRenderHeader from "./PreRenderHeader";

export default function PreRender(){
    const {recordMap} = useNotionPage();

    if(!recordMap) return null;

    return(
        <>
            <PreRenderHeader recordMap={recordMap}/>

            <NotionPage 
                user={"none"}
                recordMap={recordMap}
                isPreview={true}
            />
        </>
    )
}