'use client';
import Link from 'next/link';
import { useCallback, useState, useRef, useEffect } from 'react';
import { Search, Rss } from 'lucide-react';

import HeaderRight from './_components/HeaderRight';

const getScrollTop = () => {
  if (!document.body) return 0;
  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;
  return scrollTop;
};

export default function Header() {
  const [visible, setVisible] = useState(true);
  const blockRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!blockRef.current) return;
    setHeight(blockRef.current.clientHeight);
  }, []);

  const prevScrollTop = useRef(0);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    const nextDirection = prevScrollTop.current > scrollTop ? 'UP' : 'DOWN';

    if (nextDirection === 'UP') {
      setVisible(true);
    } else if (nextDirection === 'DOWN') {
      setVisible(false);
    }

    prevScrollTop.current = scrollTop;
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        본문으로 건너뛰기
      </a>
      <header
        ref={blockRef}
        className="site-header"
        style={{
          transform: visible ? 'translateY(0)' : `translateY(-${height}px)`,
        }}
      >
        <div className="site-header__inner site-container">
          <Link href="/" prefetch={false} className="site-wordmark">
            NextBlog
          </Link>
          <div className="site-tools">
            <nav aria-label="블로그 메뉴" className="site-tools">
              <Link href="/search" className="site-tool" aria-label="글 검색" title="글 검색">
                <Search size={20} />
              </Link>
              <a href="/rss.xml" className="site-tool" aria-label="RSS 구독" title="RSS 구독">
                <Rss size={20} />
              </a>
            </nav>
            <HeaderRight />
          </div>
        </div>
      </header>
    </>
  );
}
