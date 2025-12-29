'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { ExtendedRecordMap } from 'notion-types';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { useTheme } from '@/app/context/ThemeContext';

import '../../styles/notion.css';
import { Loading } from '../Loading';
// -----------------------------------------------------------------------------
// dynamic imports for optional components
// -----------------------------------------------------------------------------

// NotionRenderer를 SSR 없이 동적으로 로드
const NotionRenderer = dynamic(() => import('react-notion-x').then((m) => m.NotionRenderer), {
  ssr: false,
});

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m) => m.Code), {
  ssr: false,
});

const Collection = dynamic(
  () => import('react-notion-x/build/third-party/collection').then((m) => m.Collection),
  {
    ssr: false,
  },
);

const Equation = dynamic(
  () => import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
  {
    ssr: false,
  },
);
const Pdf = dynamic(() => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf), {
  ssr: false,
});

export default function NotionPageRenderer({
  recordMap,
  user,
  isPreview = false,
}: {
  recordMap: ExtendedRecordMap;
  user: string;
  isPreview?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { theme } = useTheme();

  if (!recordMap) {
    return null;
  }

  const mapPageUrl = (pageId: string) => {
    if (isPreview) {
      return `/write?pageId=${pageId}`;
    }

    return `/${user}/${pageId}`;
  };

  const PageLink = ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    props: React.HTMLAttributes<HTMLDivElement>;
  }) => {
    return (
      <div
        onClick={() => {
          if (isPreview) {
            router.push(href);
          } else {
            startTransition(() => {
              router.push(href);
            });
          }
        }}
        style={{ cursor: 'pointer' }}
        {...props}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="mx-auto mb-10 flex w-full max-w-[720px] flex-col items-center justify-center">
      <NotionRenderer
        recordMap={recordMap}
        mapPageUrl={mapPageUrl}
        previewImages={true}
        fullPage={false}
        components={{
          PageLink,
          Code,
          Collection,
          Equation,
          Pdf,
        }}
        darkMode={theme === 'dark'}
      />
      {isPending && <Loading />}
    </div>
  );
}
