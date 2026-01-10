'use client';

import { useQuery } from '@tanstack/react-query';

import NotionPage from '@/app/components/Renderer/NotionPageRenderer';
import { getRecordMapOptions } from '@/app/react-query/options/notion';

import { usePageId } from '../../../hooks/usePageIdContext';

import PreRenderHeader from './PreRenderHeader';

export default function PreRender() {
  const { pageId: inputPageId } = usePageId();
  const { data: recordMap } = useQuery(getRecordMapOptions(inputPageId));

  if (!recordMap?.isSuccess || !recordMap.data) return null;

  return (
    <>
      <PreRenderHeader recordMap={recordMap.data} />

      <NotionPage user={'none'} recordMap={recordMap.data} isPreview={true} />
    </>
  );
}
