import {Box} from "@mui/material"
import React from 'react';

import LoginModal from "../../LoginModal";
import { HoverButton } from '../../Button/button.styles';


export default function NotLoggedIn(){
    const [open,setOpen] = React.useState(false);

    const handleMenu = () =>{
        setOpen(!open);
    }

    return(
        <>
            {open&&<LoginModal open={open} setOpen={setOpen}/>}

            <Box sx={{display:"flex",
            position:"relative",
            alignItems:"center",
            }}
            >
                <HoverButton onClick={handleMenu}>
                    로그인
                </HoverButton>
            </Box>
        </>
    )
}