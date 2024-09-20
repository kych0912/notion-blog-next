'use client'
import styled from '@mui/material/styles/styled';
import Button from '@mui/material/Button';

export const WriteFunnelContainer = styled('div')(({ theme }) => ({
    display:"flex",
    flexDirection:"column",
    alignItems:"start", 
    position:"relative",
    [theme.breakpoints.down('lg')]: {
        display: 'none',
    },
    height:"100vh",
    flex:'1 1 0%'
}))

export const FunnelContainer = styled('div')({
    display:"flex",
    flexDirection:"column",
    alignItems:"start", 
    position:"sticky",
    flex:'1 1 0%',
    height:"100vh",
})

export const ContentContainer = styled('div')({
    display:"flex",
    flexDirection:"column",
    alignItems:"start",
    width:"100%",
    height:"100%",
    padding:'2rem',
})

export const InputContainer = styled('div')({
    display:"flex",
    flexDirection:"column",
    alignItems:"start",
    justifyContent:"center",    
    width:"100%",
})