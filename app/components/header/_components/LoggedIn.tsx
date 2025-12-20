'use client'
import {Box,Avatar} from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from 'next/link';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DefaultSession } from "next-auth";
import { signOut } from 'next-auth/react'

import { HoverButton } from '../../Button/button.styles';

import UserMenu from "./UserMenu";


export default function LoggedIn({user}:{user:DefaultSession}){
    const [open,setOpen] = React.useState(false);
    const [ishover,setIshover] = React.useState(false);

    const handleLogout = () =>{
        localStorage.removeItem('currentUser');
        signOut();
    }

    const isSmallScreen = useMediaQuery('(max-width:600px)'); 

    const MenuOption = [
        {
            title:"내 정보",
            link:`/${user.user?.name}`,
            isVisible:true
        },
        {
            title:"새 글 쓰기",
            link:"/write",
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
                    <Link href="/write" passHref>
                        <HoverButton>
                            새 글 쓰기
                        </HoverButton>
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
                    <Avatar src={`${user.user?.image}`}  alt="Remy Sharp" sx={{width:'40px',height:'40px'}} component="div"/>
                    {
                        open && <UserMenu MenuOption = {MenuOption}/>
                    }
                    <ArrowDropDownIcon color={ishover ? "primary" : "disabled"} sx={{transition:"all .25s ease-in"}}/>
                    
                </Box>
            </Box>
        </>
    )
}