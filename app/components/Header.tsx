import { usePathname } from "next/navigation";
import * as React from 'react'
import * as types from 'notion-types'
import { Avatar ,Typography,AppBar} from "@mui/material";
import AcUnitIcon from '@mui/icons-material/AcUnit';

export default function Header(){
    return (
            <AppBar component="header" position="sticky" sx={{
                boxShadow:'none',
                backdropFilter:"blur(30px)",
                backgroundColor:"hsla(0, 0%, 100%, .8)",
                height:"4rem",
                py:'0.5rem',
                display:'flex',
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                px:"2rem",

                }} >
                    <AcUnitIcon sx={{color:'black'}}/>
                    <Avatar alt="Remy Sharp"/>
            </AppBar>
    )
}