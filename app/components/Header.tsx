'use client';
import * as React from 'react'
import { Avatar,AppBar,Box,Button} from "@mui/material";
import {styled} from '@mui/material/styles';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const StyledButton = styled(Button)({
    border:'2px solid',
    fontSize:'1rem',
    fontWeight:700,
    borderRadius:'1rem',
    px:'2rem',
    '&:hover': {
        border:'2px solid #96C2F7',
        backgroundColor: '#96C2F7',
        color:"#ffffff"
    },
  });

const MenuItem = styled(Box)({
    color: '#000',
    p: '.75rem 1rem',
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover':{
        backgroundColor:''
    }
})

const UserMenu = () =>{
    return(
        <Box sx={{display:"flex",flexDirection:"column",position:"absolute",top:'70px',right:'30px'}}>
            <MenuItem>내 정보</MenuItem>
            <MenuItem>로그아웃</MenuItem>
        </Box>
    )
}

export default function Header(){
    const [open,setOpen] = React.useState(false);

    const handleMenu = () =>{
        setOpen(!open);
    }
    
    return (
            <AppBar component="header" position="sticky" sx={{
                boxShadow:'none',
                backdropFilter:"blur(30px)",
                backgroundColor:"hsla(0, 0%, 100%, .8)",
                py:'0.5rem',
                width:"100%"
                }} >
                    <Box sx={{
                        maxWidth:"1280px",
                        m:'0px auto',                
                        display:'flex',
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:"center",
                        width:"100%",
                        px:2
                }}>
                        {
                            open && <Box onClick={()=>{handleMenu()}} sx={{position:"fixed",inset:0,backgroundColor:"transparent",height:"100vh",zIndex:-1}}/> 
                        }
                        <AcUnitIcon sx={{color:'black'}}/>

                        <Box sx={{display:"flex"}}>
                            <StyledButton variant="outlined" sx={{mr:3}}>
                                새 글 쓰기
                            </StyledButton>
                            <Avatar onClick={()=>{handleMenu()}} alt="Remy Sharp" sx={{position:"relative"}}/>
                            {
                                open && <UserMenu/>
                            }
                        </Box>
                    </Box>
            </AppBar>
    )
}