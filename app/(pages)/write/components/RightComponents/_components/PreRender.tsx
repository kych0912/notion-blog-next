'use client';

import { useQuery } from '@tanstack/react-query';
import { getPageTitle } from 'notion-utils';

import NotionPage from '@/app/components/Renderer/NotionPageRenderer';
import { getRecordMapOptions } from '@/app/react-query/options/notion';

import { usePageId } from '../../../hooks/usePageIdContext';

export default function PreRender() {
  const { pageId: inputPageId } = usePageId();
  const {
    data: recordMap,
    isPending,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    ...getRecordMapOptions(inputPageId),
    throwOnError: false,
  });

  if (!inputPageId)
    return (
      <div className="write-preview-state">
        <h3>불러온 글이 여기에 표시돼요.</h3>
        <p>Notion 페이지 주소를 입력하고 불러오기를 눌러주세요.</p>
      </div>
    );
  if (isPending || isFetching)
    return (
      <div
        className="write-preview-loading"
        role="status"
        aria-label="Notion 페이지를 불러오는 중"
        aria-busy="true"
      >
        <span className="sr-only">Notion 페이지를 불러오는 중</span>
        <div className="skeleton write-preview-title-skeleton" aria-hidden="true" />
        <div className="skeleton write-preview-line-skeleton" aria-hidden="true" />
        <div className="skeleton write-preview-line-skeleton" aria-hidden="true" />
        <div className="skeleton write-preview-line-skeleton" aria-hidden="true" />
      </div>
    );
  if (isError || !recordMap?.isSuccess || !recordMap.data)
    return (
      <div className="write-preview-state write-preview-error">
        <h3 role="alert">페이지를 불러오지 못했어요.</h3>
        <p>Notion에서 웹 게시 여부와 주소를 확인해 주세요.</p>
        <button
          type="button"
          className="write-button write-button--secondary"
          onClick={() => {
            void refetch();
          }}
        >
          다시 불러오기
        </button>
      </div>
    );
  const { data: recordMapData } = recordMap;

  return (
    <>
      <h3 className="write-document-title">{getPageTitle(recordMapData) || '제목 없는 글'}</h3>
      <NotionPage user={'none'} recordMap={recordMapData} isPreview={true} />
    </>
  );
}
