'use client';
import * as React from 'react'
import { Avatar,AppBar,Box,Skeleton, Typography} from "@mui/material";
import {getAccessToken} from "@/app/services/user/user";
import LoggedIn from './_components/LoggedIn';
import NotLoggedIn from './_components/NotLoggedIn';
import { useQuery } from '@tanstack/react-query';
import { getAuth } from '@/app/services/user/user';
import Link from "next/link";
import { useAuth } from '@/app/react-query/user/queries';

export default async function Header(){
    const {data,isLoading,isError}=  await useAuth();

    React.useEffect(() => {
        if (data && data.user) {
            const userSet = data.user;

            const localStorageUser = {
                avatar: userSet.avatar_url,
                name: userSet.name,
            };

            window.localStorage.setItem('currentUser', JSON.stringify(localStorageUser));
        }
    }, [data]);

        
    React.useEffect(()=>{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");

        if(codeParam){
            getAccessToken(codeParam);
        }

    },[]);

    return (
            <AppBar component="header" position="sticky" sx={{
                boxShadow:'none',
                backdropFilter:"blur(30px)",
                backgroundColor:"hsla(0, 0%, 100%, .8)",
                py:'12px',
                width:"100%"
                }} >
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


                        {
                            isLoading ?
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Skeleton variant="rounded" width={100} height={40} />
                            </Box>
                            :
                            <>
                                {
                                    data?.isLogged ?
                                    <LoggedIn data={data} /> // Fixed the prop name here
                                    :
                                    <NotLoggedIn />
                                }
                            </>
                        }

                    </Box>
            </AppBar>
    )
}