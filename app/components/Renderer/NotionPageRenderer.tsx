'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { useTheme } from '@/app/context/ThemeContext';
import { getArticleHeadings } from '@/app/lib/reading';

import ArticleNavigation from '../Post/ArticleNavigation';
import '../../styles/notion.css';
import { Loading } from '../Loading';
// -----------------------------------------------------------------------------
// dynamic imports for optional components
// -----------------------------------------------------------------------------

// Keep technical content in the HTML that readers and search crawlers receive.
const Code = dynamic(() => import('react-notion-x/third-party/code').then((m) => m.Code));

const Collection = dynamic(
  () => import('react-notion-x/third-party/collection').then((m) => m.Collection),
  {
    ssr: false,
  },
);

const Equation = dynamic(() => import('./NotionEquation'));
const Pdf = dynamic(() => import('react-notion-x/third-party/pdf').then((m) => m.Pdf), {
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
  const headings = React.useMemo(() => recordMap ? getArticleHeadings(recordMap) : [], [recordMap]);

  if (!recordMap) {
    return null;
  }

  const mapPageUrl = (pageId: string) => {
    if (isPreview) {
      return `/write?pageId=${pageId}`;
    }

    return `/${encodeURIComponent(user)}/${encodeURIComponent(pageId)}`;
  };

  const PageLink = ({
    href,
    children,
    ...props
  }: React.ComponentProps<typeof Link>) => {
    return (
      <Link
        {...props}
        href={href}
        prefetch={false}
        onNavigate={(event) => {
          if (!isPreview && typeof href === 'string') {
            event.preventDefault();
            startTransition(() => {
              router.push(href);
            });
          }
        }}
      >
        {children}
      </Link>
    );
  };

  return (
    <div className="mx-auto mb-10 flex w-full max-w-[720px] flex-col items-center justify-center">
      {!isPreview ? <ArticleNavigation headings={headings} contentId="article-body" /> : null}
      <div id={isPreview ? undefined : 'article-body'} className="article-body">
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
      </div>
      {isPending && <Loading />}
    </div>
  );
}
