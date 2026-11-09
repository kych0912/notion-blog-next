import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getBlockTitle, getBlockValue, parsePageId } from 'notion-utils';

import {
  getDescription,
  getMetadata,
  getPostPath,
  getUserPath,
} from '@/app/components/MetaData/getMetaData';
import JsonLd from '@/app/components/MetaData/JsonLd';
import { META } from '@/app/constants/metadata';
import { getPage } from '@/app/lib/notion-api';
import {
  getNotionImage,
  getPageBlockContent,
  normalizeNotionImageUrl,
} from '@/app/utils/NotionApi';
import { getPostDetailAction } from '@/app/server/actions/post';
import { getPostCategoryOptions } from '@/app/react-query/options/category';
import { getPostDetailOptions } from '@/app/react-query/options/post';
import NotionPageRenderer from '@/app/components/Renderer/NotionPageRenderer';
import PostHeaderFactory from '@/app/components/Post/Header/PostHeaderFactory';
import { getQueryClient } from '@/app/utils/utils';

interface ParamsType {
  id: string;
  user: string;
}

// Share reads between metadata and the rendered article for this request.
const getPostPage = cache(async (id: string, user: string) => {
  try {
    const authorName = decodeURIComponent(user);
    const [recordMap, postDetail] = await Promise.all([
      getPage(id),
      getPostDetailAction(id, user),
    ]);
    const pageId = parsePageId(id);
    const block = pageId ? getBlockValue(recordMap.block[pageId]) : undefined;

    if (!block || block.type !== 'page') notFound();
    if (!postDetail.isSuccess) throw new Error(postDetail.error.message);

    const post = postDetail.data.data;
    const title = getBlockTitle(block, recordMap) || post?.title || '제목 없는 글';
    const description = getDescription(
      getPageBlockContent(recordMap, Object.keys(recordMap.block)) || post?.description || title,
    );
    const coverImage = getNotionImage(block.format?.page_cover || '', block);
    const image = coverImage ? normalizeNotionImageUrl(coverImage) : undefined;
    const publishedTime = new Date(post?.date || block.created_time).toISOString();
    const modifiedTime = new Date(
      Math.max(block.last_edited_time, Date.parse(publishedTime)),
    ).toISOString();

    return {
      recordMap,
      postDetail,
      title,
      description,
      image,
      publishedTime,
      modifiedTime,
      path: getPostPath(authorName, id),
      author: { name: authorName, url: new URL(getUserPath(authorName), META.url).toString() },
    };
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === 'NOT_FOUND' || error.message === 'invalid notion pageId')
    ) {
      notFound();
    }
    throw error;
  }
});

export const generateMetadata = async ({
  params,
}: {
  params: Promise<ParamsType>;
}): Promise<Metadata> => {
  const { id, user } = await params;

  const post = await getPostPage(id, user);

  return getMetadata({
    title: post.title,
    description: post.description,
    asPath: post.path,
    ogImage: post.image,
    type: 'article',
    author: post.author,
    publishedTime: post.publishedTime,
    modifiedTime: post.modifiedTime,
  });
};

async function Page({ params }: { params: Promise<ParamsType> }) {
  const { id, user } = await params;

  try {
    const queryClient = getQueryClient();

    const [page] = await Promise.all([
      getPostPage(id, user),
      queryClient.prefetchQuery(getPostCategoryOptions(id)),
    ]);
    const { recordMap, postDetail: detail } = page;
    queryClient.setQueryData(getPostDetailOptions(id, user).queryKey, detail);

    const url = new URL(page.path, META.url).toString();

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <article>
          <JsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: page.title,
              description: page.description,
              url,
              mainEntityOfPage: { '@type': 'WebPage', '@id': url },
              author: { '@type': 'Person', ...page.author },
              datePublished: page.publishedTime,
              dateModified: page.modifiedTime,
              image: page.image ? [new URL(page.image, META.url).toString()] : undefined,
            }}
          />
          <PostHeaderFactory type="post" user={user} id={id} recordMap={recordMap} />
          <NotionPageRenderer recordMap={recordMap} user={page.author.name} />
        </article>
      </HydrationBoundary>
    );
  } catch (e: unknown) {
    console.error('Error in Page:', e);
    if (e instanceof Error && e.message === 'NOT_FOUND') {
      return notFound();
    }
    throw e;
  }
}

export default Page;
