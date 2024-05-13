"use client";

import { usePathname } from "next/navigation";
import * as React from 'react'
import * as types from 'notion-types'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'
import { Box,Typography,AppBar} from "@mui/material";

import styles from './styles.module.css'

export default function NotionPageHeader({ block }:{block: types.CollectionViewPageBlock | types.PageBlock}){
    const path = usePathname()
    const { components, rootPageId  } = useNotionContext()
    return (
            <AppBar component="header" position="sticky" sx={{
                boxShadow:'none',
                backdropFilter:"blur(30px)",
                backgroundColor:"hsla(0, 0%, 100%, .8)",
                py:'0.5rem',
                width:"100%"
                }} >
                    <Box sx={{
                        maxWidth:{md:'1024px',lg:"1400px"},
                        m:'0px auto',                
                        display:'flex',
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:"center",
                        width:"100%",
                        px:2
                }}>
                    <Breadcrumbs block={block} rootOnly={false} />
                    <Typography>
                        1234
                    </Typography>
                </Box>
            </AppBar>
    )
}