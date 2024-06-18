import { Box, TextField, Typography, Button } from "@mui/material";
import {
    FunnelContainer,
    ContentContainer,
    InputContainer,
    CustomButton
} from "../write.styles";
import Link from 'next/link'
import {SetStateAction} from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { MutateFunction } from "@tanstack/react-query";

export default function Description({nextStep,setDescription,description,handlePost}:{
        nextStep:string,
        setDescription:React.Dispatch<SetStateAction<string|undefined>>,
        description:string|undefined,
        handlePost:()=>void
    }){

    function adjustHeight(textarea: EventTarget) {
        const textareaElement = textarea as HTMLTextAreaElement; // Typecast to HTMLTextAreaElement
        textareaElement.style.height = 'auto'; 
        textareaElement.style.height = textareaElement.scrollHeight + 'px'; 
    }

    return(
        <FunnelContainer>
            <ContentContainer>
                <InputContainer>
                    <textarea placeholder="작성하는 글에 대해 간단하게 설명해주세요." 
                        value={description}
                        onInput={(e) => { adjustHeight(e.target)}}
                        onChange={(e)=>setDescription(e.target.value)}
                        style={{
                            width:"100%",
                            height:"100%",
                            border:"none",
                            outline:"none",
                            fontSize:"1.5rem",
                            fontWeight:600,
                            resize:"none",
                            fontFamily:"inherit",
                            minHeight:"200px",
                            overflowY:"auto",
                    }}/>
                </InputContainer>

                
            </ContentContainer>
            
            {
                (description?.length ?? 0) > 100 &&
                <Box sx={{display:"flex",pt:3}}>
                    <ErrorOutlineIcon color={"error"}/>
                    <Box sx={{pl:1}}>
                        <Typography color={"error"} sx={{fontSize:"1rem",fontWeight:600}}>
                            100자 이내로 작성해주세요.
                        </Typography>
                    </Box>
                </Box>
            }
                    
            <Box sx={{width:"100%",mt:2 }}>
                <Button onClick={handlePost} disabled={!description?.length || (description?.length ?? 0) > 100} variant="contained" sx={{
                    color: "white",
                    height: "3rem",
                    borderRadius: '50px',
                    width: "100%",
                    fontWeight: 700,
                    fontSize: "1rem",
                }}
                >
                    작성
                </Button>
            </Box>
        </FunnelContainer>
    )
}