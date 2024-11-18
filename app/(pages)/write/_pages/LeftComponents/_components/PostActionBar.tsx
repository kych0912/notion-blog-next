'use client'

import {
    PostActionBarContainer,
    PostActionBarButtonContainer,
    PostActionBarWrapper
} from "../../../write.styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography, CircularProgress } from "@mui/material";
import { ContainedButton } from "@/app/components/Button/button.styles";
import { useRouter } from "next/navigation";
import { useNotionPage } from "@/app/context/NotionPageContext";
import { useNotionUploader } from "@/app/hooks/write/useNotionUploader";

export default function PostActionBar(){
    const router = useRouter();
    const {recordMap, pageId} = useNotionPage();
    const { handleUploadPost,isPending } = useNotionUploader();

    return(
        <PostActionBarContainer>
            <PostActionBarWrapper>
                <PostActionBarButtonContainer
                    onClick={()=>{
                    router.push('/');
                }}
            >
                <ArrowBackIcon sx ={{mr:1}}/>
                    <Typography>뒤로가기</Typography>
                </PostActionBarButtonContainer>

                <ContainedButton
                size="small"    
                disabled={!recordMap || !pageId || isPending}
                onClick={()=>{
                    if(pageId) handleUploadPost(pageId);
                }}
            >                
                <Typography>
                    {
                        isPending ? <CircularProgress size={16} color="inherit"/> : "작성"
                    }
                </Typography>
            </ContainedButton>

            </PostActionBarWrapper>
        </PostActionBarContainer>   
    )
}


