
import * as React from 'react'
import NotionPageRenderer from '../Renderer/NotionPageRenderer';
import { Box } from '@mui/material';
import Header from "./_components/PostHeader"
import * as types from 'notion-types'

export default function NotionPage({
  recordMap,
  user,
  isAuthor,
  id,
  avatar,
  isChild
} : {recordMap: types.ExtendedRecordMap,user:string,isAuthor:boolean,id:string,avatar:string,isChild:boolean}){
    if (!recordMap) {
      return null
    }
    
  return(
  <>
        {/* 자식 페이지일 경우 특정 컴포넌트 렌더링 X */}
        {
            <Header 
            recordMap={recordMap} 
            user={user} 
            isAuthor={isAuthor} 
            id={id} 
            avatar={avatar}
            isChild={isChild}
            />
        }
        <NotionPageRenderer 
          user={user}
          recordMap={recordMap}
        />
  </>
  )
}