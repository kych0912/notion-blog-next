import { Typography } from "@mui/material";
import { Box, TextField, Button } from "@mui/material";
import { InputContainer } from "../../../write.styles";   

export default function Input(
    {url, setUrl, handleSubmit}:{url:string, setUrl:React.Dispatch<React.SetStateAction<string>>, handleSubmit:()=>void}
){
    return(
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
    )
}
