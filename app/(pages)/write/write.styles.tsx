'use client'
import styled from '@mui/material/styles/styled';
import Button from '@mui/material/Button';

export const FunnelContainer = styled('div')({
    margin:'0 1rem 0 1rem',
    display:"flex",
    flexDirection:"column",
    alignItems:"start", 
    position:"relative"
})

export const ContentContainer = styled('div')({
    display:"flex",
    flexDirection:"column",
    alignItems:"start",
    justifyContent:"space-between",
    width:"100%",
})

export const InputContainer = styled('div')({
    display:"flex",
    flexDirection:"column",
    alignItems:"start",
    justifyContent:"center",
    width:"100%"
})

export const CustomButton = styled(Button)({
    color:'white',
    height:"3rem",
    borderRadius:'50px',
    position:'absolute',
    width:"100%",
    bottom:"20px",
    fontWeight:700,
    fontSize:"1rem",
})