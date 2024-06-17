
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
  <>
        <Header recordMap={recordMap} user={user}/>
        <NotionPageRenderer 
          user={user}
          recordMap={recordMap}
        />
  </>
  )
}