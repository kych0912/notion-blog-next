'use client';

import { useQuery } from '@tanstack/react-query';

import NotionPage from '@/app/components/Renderer/NotionPageRenderer';
import PostHeaderFactory from '@/app/components/Post/Header/PostHeaderFactory';
import { getRecordMapOptions } from '@/app/react-query/options/notion';

import { usePageId } from '../../../hooks/usePageIdContext';

export default function PreRender() {
  const { pageId: inputPageId } = usePageId();
  const { data: recordMap } = useQuery(getRecordMapOptions(inputPageId));

  if (!recordMap?.isSuccess || !recordMap.data) return null;
  const { data: recordMapData } = recordMap;

  return (
    <>
      <PostHeaderFactory type="preview" recordMap={recordMapData} />

      <NotionPage user={'none'} recordMap={recordMapData} isPreview={true} />
    </>
  );
}
