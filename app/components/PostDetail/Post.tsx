'use client'

import * as React from 'react'
import NotionPageRenderer from '../Renderer/NotionPageRenderer';
import Header from "./_components/PostHeader"
import LoadingPage from '../LoadingPage';
import { usePostDetailFetch } from '@/app/react-query/post/queries';

export default function NotionPage({
  id,
  user,
  token,  
} : {id:string,user:string,token:string}){

  const { isLoading, isError, data, errors } = usePostDetailFetch(id, user, token);

  if(isLoading) return <LoadingPage />;

  const recordMap = data[0];
  const postDetail = data[1];

  const isAuthor = postDetail.isAuthor;
  const avatar = postDetail.data[0].avatar;
  const isChild = postDetail.isChild;

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