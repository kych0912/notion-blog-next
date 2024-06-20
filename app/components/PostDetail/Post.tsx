
import * as React from 'react'
import NotionPageRenderer from '../Renderer/NotionPageRenderer';
import { Box } from '@mui/material';
import Header from "./PostHeader"
import * as types from 'notion-types'

export default function NotionPage({
  recordMap,
  user,
  isAuthor,
  id,
  avatar
} : {recordMap: types.ExtendedRecordMap,user:string,isAuthor:boolean,id:string,avatar:string}){
    if (!recordMap) {
      return null
    }
  return(
  <>
        <Header recordMap={recordMap} user={user} isAuthor={isAuthor} id={id} avatar={avatar}/>
        <NotionPageRenderer 
          user={user}
          recordMap={recordMap}
        />
  </>
  )
}