import {Box,Avatar,Button} from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from 'next/link';
import {styled} from '@mui/material/styles';
import UserMenu from "./UserMenu";
import React from 'react';

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

const MenuOption = [
    {
        title:"내 정보",
        link:"/user"
    },
    {
        title:"로그아웃",
        link:"/logout"
    }

]

export default function LoggedIn(){
    const [open,setOpen] = React.useState(false);
    const [ishover,setIshover] = React.useState(false);

    const handleMenu = () =>{
        setOpen(!open);
    }

    const handleHover = (bool:boolean) =>{
        setIshover(bool);
    }
    
    return(
        <>
            {
                open && <Box onClick={()=>{handleMenu()}} sx={{position:"fixed",inset:0,backgroundColor:"transparent",height:"100vh",zIndex:-1}}/> 
            }
            <Box sx={{display:"flex",
            position:"relative",
            alignItems:"center",
            }}
            >
                <Link href="/write?step=write" passHref>
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
                        open && <UserMenu MenuOption = {MenuOption}/>
                    }
                    <ArrowDropDownIcon color={ishover ? "primary" : "disabled"} sx={{transition:"all .25s ease-in"}}/>
                    
                </Box>
            </Box>
        </>
    )
}