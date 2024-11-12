import NotionPage from "@/app/components/Renderer/NotionPageRenderer";
import {ExtendedRecordMap} from "notion-types";
import PreRenderHeader from "./PreRenderHeader";
import { useRecoilValue } from "recoil";
import { recordMapState } from "@/app/store";

export default function PreRender(){

    const recordMap = useRecoilValue(recordMapState);

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