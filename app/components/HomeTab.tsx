'use client';
import React, { useState } from 'react';
import { Box,Typography } from '@mui/material';
import axios from 'axios';
import {getAccessToken} from '../services/user/user';

const title = [
    "Home",
]

const HomeTab: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (newValue: number) => {
        setSelectedTab(newValue);
    };

    
    React.useEffect(()=>{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        console.log(codeParam);
        if(codeParam){
            getAccessToken(codeParam);
        }

    },[]);

    return (
        <Box sx={{display:"flex",py:2,width:"100%",px:'auto'}}>
            <Box sx={{display:"flex"}}>
                {
                    title.map((tab, index) => (
                        <Box key={index} className={`tab ${selectedTab === index ? 'active' : ''}`} onClick={() => handleTabChange(index)} 
                            sx={{transition:".5s",borderRadius:'8px',border:1,borderColor:'gray',mr:1}}>
                            <Typography color={selectedTab === index?'white':'black'} sx={{fontSize:'1rem',px:1,py:0.5}}>{tab}</Typography>
                        </Box>
                    ))
                }
            </Box>
        </Box>
    );
};

export default HomeTab;