
import * as React from 'react'
import NotionPageRenderer from '../Renderer/NotionPageRenderer';
import { Box } from '@mui/material';
import Header from "./PostHeader"
import * as types from 'notion-types'

export default function NotionPage({recordMap, user} : {recordMap: types.ExtendedRecordMap,rootDomain: string,rootPageId:string,user:string}){
    if (!recordMap) {
      return null
    }

  return(
    <Box sx={{
        px: '1rem',
        py:'1rem',
        borderRadius:'1.5rem',
        maxWidth:"56rem",
        backgroundColor:'white',
        boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        margin:"0 auto",
    }}>
        <Header recordMap={recordMap} user={user}/>
        <NotionPageRenderer 
          user={user}
          recordMap={recordMap}
        />
    </Box>
  )
}