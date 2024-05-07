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
                height:"4rem",
                display:'flex',
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                px:'24px'
                }} >
                    <Breadcrumbs block={block} rootOnly={false} />
                    <Typography>
                        1234
                    </Typography>
            </AppBar>
    )
}