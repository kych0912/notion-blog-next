'use client';
import React, { useState } from 'react';
import { Box,Typography } from '@mui/material';

const title = [
    "Home",
]

const HomeTab: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{display:"flex",py:2,width:"100%",px:'2rem'}}>
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