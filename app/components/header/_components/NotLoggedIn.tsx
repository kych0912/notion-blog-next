import {Box,Avatar,Button} from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from 'next/link';
import {styled} from '@mui/material/styles';
import LoginModal from "../../LoginModal";
import React from 'react';
import { Login } from "@mui/icons-material";

const StyledButton = styled(Button)({
    border:'2px solid',
    fontSize:'1.2rem',
    fontWeight:700,
    borderRadius:'1rem',
    paddingLeft:'16px',
    paddingRight:'16px',
    '&:hover': {
        border:'2px solid #96C2F7',
        backgroundColor: '#96C2F7',
        color:"#ffffff"
    },
  });


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
                <StyledButton onClick={handleMenu} variant="outlined" sx={{mr:0}}>
                    로그인
                </StyledButton>
            </Box>
        </>
    )
}