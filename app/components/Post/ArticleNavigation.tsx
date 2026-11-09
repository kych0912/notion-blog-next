'use client';

import { useEffect, useRef, useState } from 'react';

import { readingProgress, type ArticleHeading } from '@/app/lib/reading';

export default function ArticleNavigation({
  headings,
  contentId,
}: {
  headings: ArticleHeading[];
  contentId: string;
}) {
  const bar = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState('');

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
      if (fill.current) fill.current.style.transform = `scaleX(${progress / 100})`;
      bar.current?.setAttribute('aria-valuenow', String(Math.round(progress)));
      let active = targets[0]?.id ?? '';
      for (const target of targets) {
        if (target.getBoundingClientRect().top > 140) break;
        active = target.id;
      }
      setActiveId(active);
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
  }, [contentId, headings]);

  const list = (
    <ol className="article-toc__list">
      {headings.map(({ id, title, level }) => (
        <li key={id} style={{ paddingInlineStart: `${Math.min(level, 3) * 12}px` }}>
          <a href={`#${id}`} aria-current={activeId === id ? 'location' : undefined}>
            {title}
          </a>
        </li>
      ))}
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
              {list}
            </nav>
          </aside>
          <details className="article-toc article-toc--mobile">
            <summary>
              이 글의 목차 <span>{headings.length}</span>
            </summary>
            <nav aria-label="목차">{list}</nav>
          </details>
        </>
      ) : null}
    </>
  );
}
