'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import {
  getHeadingGroupId,
  groupArticleHeadings,
  readingProgress,
  updateActiveHeading,
  type ArticleHeading,
  type ArticleNavigationState,
} from '@/app/lib/reading';

export default function ArticleNavigation({
  headings,
  contentId,
}: {
  headings: ArticleHeading[];
  contentId: string;
}) {
  const bar = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const [navigation, setNavigation] = useState<ArticleNavigationState>({ activeId: '' });
  const { activeId } = navigation;
  const groups = useMemo(() => groupArticleHeadings(headings), [headings]);
  const activeGroupId = getHeadingGroupId(groups, activeId);
  const expandedId =
    navigation.expandedGroupId === undefined ? activeGroupId : navigation.expandedGroupId;

  useEffect(() => {
    const content = document.getElementById(contentId);
    if (!content) return;
    const targets = headings
      .map(({ id }) => document.getElementById(id))
      .filter((node) => node !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = content.getBoundingClientRect();
      const progress = readingProgress(rect.top, rect.height, window.innerHeight);
      let active = targets[0]?.id ?? '';
      for (const target of targets) {
        if (target.getBoundingClientRect().top > 140) break;
        active = target.id;
      }
      if (fill.current) fill.current.style.transform = `scaleX(${progress / 100})`;
      bar.current?.setAttribute('aria-valuenow', String(Math.round(progress)));
      setNavigation((previous) => updateActiveHeading(previous, active, groups));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(content);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [contentId, headings, groups]);

  const renderList = (prefix: string) => (
    <ol className="article-toc__list">
      {groups.map(({ heading, children }) => {
        const open = expandedId === heading.id;
        const childrenId = `${prefix}-${heading.id}-children`;
        return (
          <li
            key={heading.id}
            className="article-toc__group"
            data-active={activeGroupId === heading.id || undefined}
          >
            <div className="article-toc__row">
              <a
                href={`#${heading.id}`}
                title={heading.title}
                aria-current={activeId === heading.id ? 'location' : undefined}
              >
                {heading.title}
              </a>
              {children.length ? (
                <button
                  type="button"
                  className="article-toc__toggle"
                  aria-label={`${heading.title} 하위 목차`}
                  aria-expanded={open}
                  aria-controls={childrenId}
                  onClick={() =>
                    setNavigation((previous) => ({
                      ...previous,
                      expandedGroupId: open ? null : heading.id,
                    }))
                  }
                >
                  <ChevronDown size={16} aria-hidden="true" />
                </button>
              ) : null}
            </div>
            {children.length ? (
              <ol id={childrenId} className="article-toc__children" hidden={!open}>
                {children.map(({ id, title, level }) => (
                  <li
                    key={id}
                    style={{
                      paddingInlineStart: `${Math.max(0, level - heading.level - 1) * 12}px`,
                    }}
                  >
                    <a
                      href={`#${id}`}
                      title={title}
                      aria-current={activeId === id ? 'location' : undefined}
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ol>
            ) : null}
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      <div
        className="reading-progress"
        ref={bar}
        role="progressbar"
        aria-label="읽기 진행률"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      >
        <div ref={fill} className="reading-progress__fill" />
      </div>
      {headings.length ? (
        <>
          <aside className="article-toc article-toc--desktop">
            <nav aria-label="목차">
              <h2>이 글의 목차</h2>
              {renderList('desktop-toc')}
            </nav>
          </aside>
          <details className="article-toc article-toc--mobile">
            <summary>
              <span>
                이 글의 목차 <span className="article-toc__count">{headings.length}</span>
              </span>
              <ChevronDown className="article-toc__summary-icon" size={16} aria-hidden="true" />
            </summary>
            <nav aria-label="목차">{renderList('mobile-toc')}</nav>
          </details>
        </>
      ) : null}
    </>
  );
}
