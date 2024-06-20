'use client'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';
import DeleteModal from '../Modal/Modal';
import { IconButton, Typography } from '@mui/material';

export default function Option({id}:{id:string}) {
    const [open, setOpen] = React.useState(false);  
    const handleMenu = () => {
        setOpen(!open);
    }

    return (
        <>
            <IconButton onClick={handleMenu} sx={{p:0}}>
                <Typography sx={{}}>
                    삭제
                </Typography>
            </IconButton>
            {open && <DeleteModal id={id} open={open} handleOpen={() => handleMenu()} />}
        </>
    );
}