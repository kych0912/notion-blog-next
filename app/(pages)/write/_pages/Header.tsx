import * as React from 'react'
import { Avatar,AppBar,Box,IconButton, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Header({onBack}:{
        onBack:()=>void
    }){
    
    return (
            <AppBar component="header" position='sticky' sx={{
                boxShadow:'none',
                backdropFilter:"blur(30px)",
                backgroundColor:"hsla(0, 0%, 100%, .8)",
                py:'0.5rem',
                width:"100%"
                }} >
                <Box sx={{             
                        display:'flex',
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:"center",
                        width:"100%",
                        px:'2rem',
                        height:'42px'
                }}>
                    <IconButton onClick={()=>onBack()}
                        sx={{
                            p:0
                        }}
                    >
                        <ArrowBackIcon onClick={()=>onBack}/>
                    </IconButton>
                </Box>
            </AppBar>
    )
}