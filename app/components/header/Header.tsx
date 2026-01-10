'use client';
import Link from 'next/link';
import { useCallback, useState, useRef, useEffect } from 'react';

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
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <header
      ref={blockRef}
      className="sticky top-0 z-[50] w-full py-3 backdrop-blur-2xl"
      style={{
        transform: visible ? 'translateY(0)' : `translateY(-${height}px)`,
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <div className="mx-auto flex h-10 w-full items-center justify-between px-2 md:max-w-[900px] lg:max-w-[1200px]">
        <Link href="/" className="text-[21px] font-bold text-foreground no-underline">
          NextBlog
        </Link>
        <HeaderRight />
      </div>
    </header>
  );
}
