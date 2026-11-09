'use client';

import { useId, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';

import { getUserPostCategoriesOptions } from '@/app/react-query/options/category';

import { CategoryItem } from './CategoryItem';

export default function Category({ userName }: { userName: string }) {
  const {
    data: categories,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useQuery(getUserPostCategoriesOptions(userName));
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  return (
    <aside className="profile-categories" aria-label="카테고리">
      <div className="profile-section-heading">
        <h2>카테고리</h2>
        <button
          type="button"
          className="profile-category-toggle"
          aria-label={expanded ? '카테고리 접기' : '카테고리 펼치기'}
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={() => setExpanded(!expanded)}
        >
          <ChevronDown size={20} aria-hidden="true" />
        </button>
      </div>
      <noscript>
        <style>{`.profile-category-content { display: block !important; } .profile-category-toggle { display: none !important; }`}</style>
      </noscript>
      <div id={contentId} className="profile-category-content" data-expanded={expanded}>
        {isPending ? (
          <div
            className="profile-category-loading"
            role="status"
            aria-label="카테고리를 불러오는 중"
          >
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="skeleton category-skeleton" aria-hidden="true" />
            ))}
          </div>
        ) : isError ? (
          <div className="profile-category-message">
            <p role="alert">카테고리를 불러오지 못했어요.</p>
            <button
              type="button"
              className="profile-retry"
              disabled={isFetching}
              onClick={() => {
                void refetch();
              }}
            >
              다시 불러오기
            </button>
          </div>
        ) : !categories?.length ? (
          <p className="profile-category-message">아직 분류된 글이 없어요.</p>
        ) : (
          <div className="profile-category-list">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
