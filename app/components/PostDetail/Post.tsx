import * as React from 'react'
import NotionPageRenderer from '../Renderer/NotionPageRenderer';
import Header from "./_components/PostHeader"
import * as types from "notion-types"

export default function NotionPage({
  user,
  id,
  postDetail,
  recordMap,
} : {postDetail:any,recordMap:types.ExtendedRecordMap,user:string,id:string}){

  const isAuthor = postDetail.isAuthor || false;
  const avatar = postDetail.data[0]?.avatar || "";
  const isChild = postDetail.isChild || false;

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