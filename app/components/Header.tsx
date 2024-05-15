'use client';
import * as React from 'react'
import { Avatar,AppBar,Box,Button, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from 'next/link';

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
    '&:hover':{
        borderLeft:'4px solid #96C2F7',
        backgroundColor:'#f9f9f9'
    }
})



const UserMenu = () =>{
    return(
        <Box sx={{display:"flex",
            flexDirection:"column",
            position:"absolute",
            top:'100%',
            right:'0px',
            mt:1
        }}>
            <Box sx={{
                width:"12rem",
                backgroundColor:"#fff",
            }}>
                <MenuItem>
                    <Typography variant="body1" sx={{
                        color: '#000',
                        p: '.75rem 1rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                    }}>
                        내 정보
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <Typography variant="body1" sx={{
                        color: '#000',
                        p: '.75rem 1rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                    }}>
                        로그아웃
                    </Typography>
                </MenuItem>
            </Box>
        </Box>
    )
}



export default function Header(){
    const [open,setOpen] = React.useState(false);
    const [ishover,setIshover] = React.useState(false);

    const handleMenu = () =>{
        setOpen(!open);
    }

    const handleHover = (bool:boolean) =>{
        setIshover(bool);
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
                        maxWidth:{md:'1024px',lg:"1400px"},
                        margin:'auto',                
                        display:'flex',
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:"center",
                        width:"100%",
                        px:2,
                        height:'42px'
                    }}>
                        {
                            open && <Box onClick={()=>{handleMenu()}} sx={{position:"fixed",inset:0,backgroundColor:"transparent",height:"100vh",zIndex:-1}}/> 
                        }


                        <AcUnitIcon sx={{color:'black'}}/>

                        <Box sx={{display:"flex",
                            position:"relative",
                            alignItems:"center",
                            }}
                        >
                            <Link href="/write" passHref>
                                <StyledButton variant="outlined" sx={{mr:3}}>
                                    새 글 쓰기
                                </StyledButton>
                            </Link>
                            <Box
                            sx={{
                                display:"flex",
                                alignItems:"center",
                                cursor:"pointer",
                                position:"relative"
                            }}
                                onMouseEnter={()=>{handleHover(true)}}
                                onMouseLeave={()=>{handleHover(false)}}
                            >
                                <Avatar onClick={()=>{handleMenu()}} alt="Remy Sharp"/>
                                {
                                    open && <UserMenu/>
                                }
                                <ArrowDropDownIcon color={ishover ? "primary" : "disabled"} sx={{transition:"all .25s ease-in"}}/>
                                
                            </Box>
                        </Box>
                    </Box>
            </AppBar>
    )
}