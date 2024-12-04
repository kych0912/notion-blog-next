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
    flex:'2 1 0%',
    width:"50%",
    overflowY:"auto",
}))

export const FunnelContainer = styled('div')({
    display:"flex",
    flexDirection:"column",
    alignItems:"start", 
    position:"sticky",
    flex:'1 1 0%',
    width:"100%",
    height:"calc(100vh - 64px)",
})

export const ContentContainer = styled('div')({
    display:"flex",
    flexDirection:"column",
    alignItems:"start",
    justifyContent:"start",
    width:"100%",
    padding:'2rem',
    boxSizing:"border-box",
    height:'100%',
    position:"relative",
})

export const InputContainer = styled('div')({
    display:"flex",
    flexDirection:"column",
    alignItems:"start",
    justifyContent:"center",    
    width:"100%",
})

export const PostActionBarContainer = styled('nav')(({ theme }) => ({
    display:"flex",
    alignSelf:"center",
    width:"100%",
    position:"fixed",
    [theme.breakpoints.up('lg')]: {
        position:"absolute",
    },
    bottom:"0",
}))

export const PostActionBarWrapper = styled('div')({
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    height:"100%",
    width:"100%",
    padding:"1rem",
})

export const PostActionBarButtonContainer = styled('div')({
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    height:"100%",
    cursor:"pointer",
})
