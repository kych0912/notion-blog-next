import { Typography, Box } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Information(){
    return(
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
    )
}
