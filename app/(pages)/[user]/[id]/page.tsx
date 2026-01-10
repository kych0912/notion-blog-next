import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getMetadata } from '@/app/components/MetaData/getMetaData';
import { getPage } from '@/app/lib/notion-api';
import { getPageBlockContent } from '@/app/utils/NotionApi';
import { getPostCategoryOptions } from '@/app/react-query/options/category';
import { getPostDetailOptions } from '@/app/react-query/options/post';
import NotionPageRenderer from '@/app/components/Renderer/NotionPageRenderer';
import { getQueryClient } from '@/app/utils/utils';

import Header from './_components/PostHeader';
import PostContextProvider from './_providers/PostContextProvider';

interface ParamsType {
  id: string;
  user: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<ParamsType>;
}): Promise<Metadata> => {
  const { id, user } = await params;

  const recordMap = await getPage(id);
  const keys = Object.keys(recordMap?.block || {});
  const blockValue = recordMap?.block?.[keys[0]]?.value;

  if (blockValue?.type !== 'page') {
    return notFound();
  }

  const title = blockValue.properties?.title?.[0]?.[0] ?? '';
  const description = getPageBlockContent(recordMap, keys);
  return getMetadata({ title, description, asPath: `/@${user}/${id}` });
};

async function Page({ params }: { params: Promise<ParamsType> }) {
  const { id, user } = await params;

  try {
    const queryClient = getQueryClient();

    const [, , recordMap] = await Promise.all([
      queryClient.prefetchQuery(getPostCategoryOptions(id)),
      queryClient.prefetchQuery(getPostDetailOptions(id, user)),
      getPage(id),
    ]);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostContextProvider user={user} id={id} recordMap={recordMap}>
          <Header />
          <NotionPageRenderer recordMap={recordMap} user={user} />
        </PostContextProvider>
      </HydrationBoundary>
    );
  } catch (e: unknown) {
    if (e instanceof Error && e.message === 'NOT_FOUND') {
      return notFound();
    }
    throw e;
  }
}

export default Page;
