'use client'
import { useState, useEffect } from 'react';
import {Box,Typography,Avatar,Divider} from '@mui/material'


export default function User({id,avatar}:{id:string,avatar:string}){

    return(
        <Box sx={{
            display:'flex',
            flexDirection:"column",
            alignItems:"start",
            justifyContent:"center",
            px:"calc(min(16px, 8vw))",
            margin:"0 auto",
            maxWidth:"720px",
        }}> 
                <Box sx={{
                    display:"flex",
                    justifyContent:"start",
                    alignItems:{md:"center",xs:'start'},
                    flexDirection:{xs:"column",md:"row"},
                }}>
                    <Avatar sx={{width:128,height:128}} src={`${avatar ? avatar:''}`}/>
                    <Typography sx={{
                        fontSize:"1.5rem",
                        fontWeight:700,
                        pl:{md:3,xs:0},
                        pt:{md:0,xs:2}
                    }}>{decodeURIComponent(id)}</Typography>
                </Box>

            <Divider sx={{width:"100%",mt:5,mb:3}}/>
        </Box>
    )
}