'use client'
import styled from '@mui/material/styles/styled';

export const WriteFunnelContainer = styled('div')(({ theme }) => ({
    display:"flex",
    flexDirection:"column",
    alignItems:"start", 
    position:"relative",
    [theme.breakpoints.down('lg')]: {
        display: 'none',
    },
    height:"100vh",
    flex:'1 1 0%',
    width:"50%",
    overflowY:"auto",
}))

export const FunnelContainer = styled('div')({
    display:"flex",
    flexDirection:"column",
    alignItems:"start", 
    position:"sticky",
    flex:'1 1 0%',
    width:"50%",
    height:"calc(100vh - 64px)",
})

export const ContentContainer = styled('div')({
    display:"flex",
    flexDirection:"column",
    alignItems:"start",
    justifyContent:"space-between",
    width:"100%",
    padding:'2rem',
    boxSizing:"border-box",
    height:'100%',
})

export const InputContainer = styled('div')({
    display:"flex",
    flexDirection:"column",
    alignItems:"start",
    justifyContent:"center",    
    width:"100%",
})

export const PostActionBarContainer = styled('nav')({
    display:"flex",
    alignItems:"start",
    justifyContent:"space-between",
    width:"100%",
    paddingTop:'1rem',
})
