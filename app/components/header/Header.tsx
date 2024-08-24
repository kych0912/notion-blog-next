'use client';
import * as React from 'react'
import { Avatar,AppBar,Box,Skeleton, Typography} from "@mui/material";
import Link from "next/link";
import { SessionProvider } from 'next-auth/react';
import HeaderRight from './_components/HeaderRight';

export default function Header(){

    return (
            <AppBar component="header" position="sticky" sx={{
                boxShadow:'none',
                backdropFilter:"blur(30px)",
                backgroundColor:"hsla(0, 0%, 100%, .8)",
                py:'12px',
                width:"100%"
                }} >
                    <SessionProvider>
                    <Box sx={{
                        maxWidth:{md:'900px',lg:"1200px"},
                        margin:'auto',                
                        display:'flex',
                        flexDirection:"row",
                        justifyContent:"space-between", 
                        alignItems:"center",
                        width:"100%",
                        px:2,
                        height:'40px'
                    }}>

                        <Link href="/"  style={{ textDecoration: "none"}}>
                            <Typography sx={{fontSize:"21px",color:"black",fontWeight:700}}>Notion Blog</Typography>
                        </Link>

                        <HeaderRight/>
                        </Box>
                    </SessionProvider>
            </AppBar>
    )
}