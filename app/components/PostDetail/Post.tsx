import * as types from "notion-types";

import type { GetPostDetailResponse } from "@/app/services/post/server";

import NotionPageRenderer from "../Renderer/NotionPageRenderer";

import Header from "./_components/PostHeader";

export default function NotionPage({
  user,
  id,
  postDetail,
  recordMap,
}: {
  postDetail: GetPostDetailResponse;
  recordMap: types.ExtendedRecordMap;
  user: string;
  id: string;
}) {
  const isAuthor = postDetail.isAuthor || false;
  const avatar = postDetail.data?.avatar || "";
  const isChild = postDetail.isChild || false;
  const image = postDetail.data?.image || "";

  return (
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
          image={image}
        />
      }
      <NotionPageRenderer user={user} recordMap={recordMap} />
    </>
  );
}
