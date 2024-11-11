import NotionPage from "@/app/components/Renderer/NotionPageRenderer";
import {ExtendedRecordMap} from "notion-types";
import PreRenderHeader from "./PreRenderHeader";

export default function PreRender({
    recordMap
}:{
    recordMap:ExtendedRecordMap
}){

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