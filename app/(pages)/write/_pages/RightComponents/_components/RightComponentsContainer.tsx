import { Box } from "@mui/material";
import { WriteFunnelContainer } from "../../../write.styles";


export default function RightComponentsContainer({children}:{children:React.ReactNode}){
    return(
        <WriteFunnelContainer>  
        <Box sx={{
            width:"100%",   
            height:"100%",
            overflowY:"auto",
            pb:"6rem"
            }}>
                {children}
            </Box>
        </WriteFunnelContainer> 
    )
}

