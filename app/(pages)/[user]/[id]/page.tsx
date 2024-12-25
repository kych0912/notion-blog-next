import NotionPage from "@/app/components/PostDetail/Post";
import { cookies } from "next/headers";
import type { Metadata } from 'next';
import { getMetadata } from "@/app/components/MetaData/getMetaData";
import { fetchPostAndRecordMap, getRecordMap } from "@/app/services/post/post";
import {getPageBlockContent} from "@/app/utils/NotionApi";

type paramsType = {
    params: {
        id: string,
        user: string
    }
};

export const generateMetadata = async ({ params }: paramsType): Promise<Metadata> => {
    const { id, user } = params;
    const cookieStore = cookies();
    const token = cookieStore.get(process.env.NEXTAUTH_COOKIE_NAME as string)?.value ?? '';

    const recordMap = await getRecordMap(id);
    const keys = Object.keys(recordMap?.block || {});

    const title = recordMap?.block?.[keys[0]].value.properties.title[0][0];
    const description = getPageBlockContent(recordMap,keys);
    return getMetadata({ title, description, asPath: `/@${user}/${id}` });
};

async function Page({ params }: paramsType) {
    const { id, user } = params;
    const cookieStore = cookies();
    const token = cookieStore.get(process.env.NEXTAUTH_COOKIE_NAME as string)?.value ?? '';

    const { postDetail, recordMap } = await fetchPostAndRecordMap(id, user, token, id);

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
}

export default Page;