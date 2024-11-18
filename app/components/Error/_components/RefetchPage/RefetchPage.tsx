import { Box, Button, Typography } from "@mui/material";

export default function RefetchPage({refetch}:{refetch:()=>void}){
    return (
        <Box sx={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            width:"100%",
            height:"100%",
            gap:"1rem",
        }}>
            <Typography fontWeight={700} fontSize="1.2rem"> 잠시 후 다시 시도해주세요. </Typography>
            <Typography fontWeight={400} fontSize="0.8rem"> 문제가 지속될 경우 문의해 주세요. </Typography>
            <Button onClick={refetch}> 다시 시도 </Button>
        </Box>

    )
}