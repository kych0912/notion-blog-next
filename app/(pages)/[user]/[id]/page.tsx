import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import NotionPage from '@/app/components/PostDetail/Post';
import { getMetadata } from '@/app/components/MetaData/getMetaData';
import { getPage } from '@/app/lib/notion-api';
import { getPageBlockContent } from '@/app/utils/NotionApi';
import { getPostDetailAction } from '@/app/server/actions/post';

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
    const [postDetail, recordMap] = await Promise.all([getPostDetailAction(id, user), getPage(id)]);

    if (!postDetail.isSuccess) {
      return notFound();
    }

    const postDetailData = postDetail.data;

    return (
      <>
        <NotionPage id={id} user={user} postDetail={postDetailData} recordMap={recordMap} />
      </>
    );
  } catch (e: unknown) {
    if (e instanceof Error && e.message === 'NOT_FOUND') {
      return notFound();
    }
    throw e;
  }
}

export default Page;
