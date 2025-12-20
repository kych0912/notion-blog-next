'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import NotionPage from '@/app/components/Renderer/NotionPageRenderer';
import { getRecordMapOptions } from '@/app/react-query/options/notion';

import { usePageId } from '../../../hooks/usePageIdContext';

import PreRenderHeader from './PreRenderHeader';

export default function PreRender() {
  const { pageId: inputPageId } = usePageId();
  const { data: recordMap } = useSuspenseQuery(getRecordMapOptions(inputPageId));

  if (!recordMap) {
    return null;
  }

  return (
    <>
      <PreRenderHeader recordMap={recordMap} />

      <NotionPage user={'none'} recordMap={recordMap} isPreview={true} />
    </>
  );
}
