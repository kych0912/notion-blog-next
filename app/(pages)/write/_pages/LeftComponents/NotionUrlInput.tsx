'use client'

import { Box, TextField, Typography, Button } from "@mui/material";
import {
    FunnelContainer,
    ContentContainer,
    InputContainer,
} from "../../write.styles";
import { useState} from 'react'
import { useRouter } from 'next/navigation';
import { parsePageId } from "notion-utils";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function NotionUrlInput(){
        
    const [url, setUrl] = useState('');
    const router = useRouter();

    const handleSubmit = () => {
        if (url) {
            const pageId = parsePageId(url);
            router.push(`/write?pageId=${pageId}`);
        }
    };
        


    return(
        <FunnelContainer>
            <ContentContainer>
                <InputContainer>
                    <Typography variant="h5" sx={{
                        fontWeight:700,
                    }}>
                        Notion 페이지 주소를 입력해주세요.
                    </Typography>

                    <Box sx={{
                        width:"100%",
                        pt:4,
                        position:"relative"
                    }}>
                        <TextField variant="outlined"
                        onChange={(e)=>setUrl(e.target.value)}
                        placeholder="https://www.notion.so/..."
                        value={url}
                        sx={{
                            color:"primary.main",
                            width:"100%",
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                    backgroundColor: 'transparent',
                                }
                            },
                            '& input': {
                                '&:-webkit-autofill': {
                                    WebkitBoxShadow: '0 0 0 1000px white inset',
                                    WebkitTextFillColor: 'inherit',
                                    backgroundColor: 'transparent !important',
                                },
                            }
                        }}
                        InputProps={{
                            sx:{
                                borderRadius:'12px',
                                pr:'110px',
                            }
                        }}
                        />
                            <Button
                                onClick={handleSubmit}
                                disabled={!url?.length}
                                color="primary"
                                variant="contained"
                                sx={{position:'absolute',right:'20px',bottom:'10px',boxShadow:0,borderRadius:"50px"}}>
                                <Typography sx={{fontWeight:'600',fontSize:'15px',color:"white"}}>
                                    {"불러오기"}
                                </Typography>
                            </Button>
                    </Box>
                </InputContainer>

                <Box sx={{
                    display:"flex",
                    flexDirection:"column",
                    mt:3,
                    width:"100%",
                    backgroundColor:"primary.light",
                    p:3,
                    borderRadius:"12px"
                }}>
                    <Box sx={{display:"flex"}}>
                        <ErrorOutlineIcon/>
                        <Box sx={{pl:1}}>
                            <Typography sx={{fontWeight:700,fontSize:'16px'}}>
                                Notion 페이지 링크는 어디서 복사하나요?
                            </Typography>
                            <Typography sx={{fontSize:'0.75rem'}}>
                                Notion 페이지 주소를 입력하면, 해당 페이지의 내용을 분석하여 블로그 포스트를 작성합니다.
                            </Typography>
                        </Box>
                    </Box>
                    <img src="https://app.oopy.io/static/media/notion-help.a5ea9a08.gif" alt="notion-help" style={{width: '100%', marginTop: '8px', marginBottom: '8px', borderRadius: '8px'}}></img>
                </Box>
                
            </ContentContainer>
        
        </FunnelContainer>
    )
}