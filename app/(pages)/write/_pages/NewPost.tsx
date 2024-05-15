import { Box, TextField, Typography, Button } from "@mui/material";
import {
    FunnelContainer,
    ContentContainer,
    InputContainer,
    CustomButton
} from "../write.styles";
import Link from 'next/link'
import {SetStateAction} from 'react'

export default function NewPost({onNext,nextStep}:{
        onNext:()=>void,
        nextStep:string
    }){

    return(
        <FunnelContainer>
            <ContentContainer>
                <InputContainer>
                    <Typography variant="h4" sx={{
                        fontWeight:700,
                    }}>
                        Notion 페이지 주소를 입력해주세요.
                    </Typography>

                    <Box sx={{
                        width:"100%",
                        pt:5
                    }}>
                        <TextField variant="outlined"
                        placeholder="https://www.notion.so/..."
                        sx={{
                            color:"primary.main",
                            width:"100%"
                        }}
                        InputProps={{
                            sx:{
                                borderRadius:'50px',
                                pl:2
                            }
                        }}
                        />
                    </Box>
                </InputContainer>
                
                <Link href={`write/?step=${nextStep}`} shallow passHref>
                    <CustomButton onClick={()=>onNext()} variant="contained">
                        작성
                    </CustomButton>
                </Link>
            </ContentContainer>
        
        </FunnelContainer>
    )
}