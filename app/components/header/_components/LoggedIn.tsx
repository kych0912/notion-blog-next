'use client'
import {Box,Avatar,Button} from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from 'next/link';
import {styled} from '@mui/material/styles';
import UserMenu from "./UserMenu";
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useLogout } from "@/app/react-query/user/mutations";
import useMediaQuery from '@mui/material/useMediaQuery';
import { JwtPayload } from "jsonwebtoken";

const StyledButton = styled(Button)({
    border:'2px solid',
    fontSize:'1rem',
    fontWeight:700,
    borderRadius:'1rem',
    paddingLeft:'16px',
    paddingRight:'16px',
    '&:hover': {
        border:'2px solid #96C2F7',
        backgroundColor: '#96C2F7',
        color:"#ffffff"
    },
  });

interface UserDataProps{
    data:AuthResponse
}

export default function LoggedIn({data}:UserDataProps){
    const [open,setOpen] = React.useState(false);
    const [ishover,setIshover] = React.useState(false);
    const router = useRouter();
    const mutation = useLogout();

    const handleLogout = () =>{
        mutation.mutate(undefined);
    }

    const isSmallScreen = useMediaQuery('(max-width:600px)'); 

    const MenuOption = [
        {
            title:"내 정보",
            link:"/user",
            handleClick:()=>{router.push(`/${data.id.id}`)},
            isVisible:true
        },
        {
            title:"새 글 쓰기",
            link:"/write",
            handleClick:()=>{router.push("/write")},
            isVisible:isSmallScreen
        },
        {
            title:"로그아웃",
            link:"/logout",
            handleClick:handleLogout,
            isVisible:true
        }
    ]

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
                <Box sx={{pr:3,display:{xs:"none",sm:'flex'}}}>
                    <Link href="/write?step=write" passHref>
                        <StyledButton variant="outlined">
                            새 글 쓰기
                        </StyledButton>
                    </Link>
                </Box>

                <Box
                sx={{
                    display:"flex",
                    alignItems:"center",
                    cursor:"pointer",
                    position:"relative"
                }}
                    onMouseEnter={()=>{handleHover(true)}}
                    onMouseLeave={()=>{handleHover(false)}}
                    onClick={()=>{handleMenu()}} 
                >
                    <Avatar alt="Remy Sharp" sx={{width:'40px',height:'40px'}} component="div"/>
                    {
                        open && <UserMenu MenuOption = {MenuOption}/>
                    }
                    <ArrowDropDownIcon color={ishover ? "primary" : "disabled"} sx={{transition:"all .25s ease-in"}}/>
                    
                </Box>
            </Box>
        </>
    )
}