import NotionPage from "@/app/components/Renderer/NotionPageRenderer";
import PreRenderHeader from "./PreRenderHeader";
import { useNotionPage } from "@/app/context/NotionPageContext";

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