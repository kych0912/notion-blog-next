'use client';
import * as React from 'react'
import { Avatar,AppBar,Box,Skeleton, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LoggedIn from './_components/LoggedIn';
import NotLoggedIn from './_components/NotLoggedIn';
import { useQuery } from '@tanstack/react-query';
import { getAuth } from '@/app/services/user/user';


export default function Header(){
    const {data,isLoading,isError}= useQuery({
        queryKey: ['auth'],
        queryFn: ()=>getAuth(),
        retry:false,
    });


    return (
            <AppBar component="header" position="sticky" sx={{
                boxShadow:'none',
                backdropFilter:"blur(30px)",
                backgroundColor:"hsla(0, 0%, 100%, .8)",
                py:'12px',
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
                        height:'40px'
                    }}>

                        <AcUnitIcon sx={{color:'black'}}/>


                        {
                            isLoading?
                            <Box sx={{display:"flex",gap:2}}>
                                <Skeleton variant="rounded" width={100} height={40} />
                            </Box>
                            :
                            <>
                            {
                                data?.data.isLogged?
                                <LoggedIn/>
                                :
                                <NotLoggedIn/>
                            }
                            </>
                        }

                    </Box>
            </AppBar>
    )
}