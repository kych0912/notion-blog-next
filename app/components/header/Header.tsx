'use client';
import * as React from 'react'
import { Avatar,AppBar,Box,Skeleton, Typography} from "@mui/material";
import Link from "next/link";
import HeaderRight from './_components/HeaderRight';
import { useCallback, useState, useRef, useEffect } from 'react';

const getScrollTop = () => {
    if (!document.body) return 0;
    const scrollTop = document.documentElement
      ? document.documentElement.scrollTop || document.body.scrollTop
      : document.body.scrollTop;
    return scrollTop;
  };
  

export default function Header(){
    const [visible, setVisible] = useState(true);
    const blockRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const [marginTop, setMarginTop] = useState(0);
    useEffect(() => {
      if (!blockRef.current) return;
      setHeight(blockRef.current.clientHeight);
      setMarginTop(-1 * blockRef.current.clientHeight);
    }, []);
  
    const prevScrollTop = useRef(0);
    const direction = useRef<'UP' | 'DOWN'>('DOWN');
    const transitionPoint = useRef(0);
  
    const onScroll = useCallback(() => {
      const scrollTop = getScrollTop();
      const nextDirection = prevScrollTop.current > scrollTop ? 'UP' : 'DOWN';
  
      if (nextDirection === 'UP') {
        setVisible(true);
      } else if (nextDirection === 'DOWN') {
        setVisible(false);
      }
  
      prevScrollTop.current = scrollTop;
    }, []);
  
    useEffect(() => {
      document.addEventListener('scroll', onScroll);
      return () => {
        document.removeEventListener('scroll', onScroll);
      };
    }, [onScroll]);

    return (
            <AppBar component="header" position="sticky" 
            style={{
                transform: visible ? 'translateY(0)' : `translateY(-${height}px)`,
                transition: 'transform 0.3s ease-in-out',
            }}
            sx={{
                boxShadow:'none',
                backdropFilter:"blur(30px)",
                backgroundColor:"transparent",
                py:'12px',
                width:"100%",
                zIndex:299,
                }} 
                ref = {blockRef}
                >    
                    <Box sx={{
                        maxWidth:{md:'900px',lg:"1200px"},
                        margin:'auto',                
                        display:'flex',
                        flexDirection:"row",
                        justifyContent:"space-between", 
                        alignItems:"center",
                        width:"100%",
                        px:2,
                        height:'40px'
                    }}>

                        <Link href="/"  style={{ textDecoration: "none"}}>
                            <Typography sx={{fontSize:"21px",color:"black",fontWeight:700}}>Notion Blog</Typography>
                        </Link>

                        <HeaderRight/>
                    </Box>
            </AppBar>
    )
}