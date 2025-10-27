import NotionPage from "@/app/components/PostDetail/Post";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { getMetadata } from "@/app/components/MetaData/getMetaData";
import { getPage } from "@/app/lib/notion-api";
import { getPageBlockContent } from "@/app/utils/NotionApi";
import { getPage as getNotionPage } from "@/app/lib/notion-api";
import { getToken } from "next-auth/jwt";
import { notFound } from "next/navigation";
import { getPostDetailServer } from "@/app/services/post/server";

type paramsType = {
  params: {
    id: string;
    user: string;
  };
};

export const generateMetadata = async ({
  params,
}: paramsType): Promise<Metadata> => {
  const { id, user } = params;

  const recordMap = await getNotionPage(id);
  const keys = Object.keys(recordMap?.block || {});

  const title = recordMap?.block?.[keys[0]].value.properties.title[0][0];
  const description = getPageBlockContent(recordMap, keys);
  return getMetadata({ title, description, asPath: `/@${user}/${id}` });
};

async function Page({ params }: paramsType) {
  const { id, user } = params;

  try {
    const [postDetail, recordMap] = await Promise.all([
      getPostDetailServer(id, user),
      getPage(id),
    ]);

    return (
      <>
        <NotionPage
          id={id}
          user={user}
          postDetail={postDetail}
          recordMap={recordMap}
        />
      </>
    );
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "NOT_FOUND") {
      return notFound();
    }
    throw e;
  }
}

export default Page;
