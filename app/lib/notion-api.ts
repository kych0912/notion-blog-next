import { NotionAPI } from 'notion-client'
import * as types from 'notion-types'
import { getPageTitle, getBlockParentPage } from 'notion-utils'
import { getPostById } from './postData/postDB'

const notion = new NotionAPI()

export async function getPage(id:string) {
    return await notion.getPage(id)
}

export function getNotionImage(url:string,keys:string[], block:types.Block){
    if (!url) {
        return null;
    }

    const baseUrl = 'https://www.notion.so';
    const isImagePath = url.startsWith('/image');
    const encodedUrl = encodeURIComponent(url);
    
    if (url.startsWith('/')) {
        url = `${baseUrl}${isImagePath ? url : `/image/${encodedUrl}`}`;
        return url;
    } else {
        url = `${baseUrl}${isImagePath ? url : `/image/${encodedUrl}`}`;
    }

    // URL 객체 생성 및 검색 매개변수 설정
    const notionImageUrl = new URL(url);
    let table = block.parent_table === 'space' ? 'block' : block.parent_table;
    
    if (table === 'collection' || table === 'team') {
        table = 'block';
    }
    
    notionImageUrl.searchParams.set('table', table);
    notionImageUrl.searchParams.set('id', keys[0]);
    notionImageUrl.searchParams.set('cache', 'v2');

    return notionImageUrl.toString();
}

export function getPageBlockContent(recordMap:types.RecordMap, keys:string[]){
    for(let i = 1;i<keys.length;i++){
        const block = recordMap?.block?.[keys[i]]?.value.properties?.title[0][0];
        const type = recordMap?.block?.[keys[i]]?.value.type;
        if(block && type === 'text'){
            return block;
        }
    }
}

export async function getNotionPageContent(id:string):Promise<{
    image:string,
    title:string
}>{
    const recordMap: types.ExtendedRecordMap = await getPage(id);

    const keys = Object.keys(recordMap?.block || {});
    const block = recordMap?.block?.[keys[0]]?.value;

    let coverImg = recordMap?.block?.[keys[0]].value.format?.page_cover;

    coverImg = getNotionImage(coverImg, keys, block);

    const title = getPageTitle(recordMap);


    return{
        image:coverImg,
        title:title || ""
    }

}


/**
 * 재귀적으로 위로 올라가며 페이지가 DB에 저장되어 있는지를 확인하는 함수
 * @param id 탐색할 페이지의 id
 * @returns 페이지가 DB에 저장되어 있는지 여부
 */
export async function isDescendantOfStoredPage(id: string): Promise<boolean> {
    try {
        // DB에서 포스트 존재 확인
        const page = await getPostById(id);

        // DB에 존재하면 true 반환
        if (Array.isArray(page) && page.length !== 0) {
            return true;
        }

        // 해당 페이지 정보 추출
        const recordMap = await getPage(id);
        const block = recordMap.block[Object.keys(recordMap.block)[0]].value;

        // 부모 페이지 추출
        const parentPage = await getBlockParentPage(block, recordMap);

        // 부모 페이지가 없으면 (루트 페이지) false 반환
        if (!parentPage) {
            return false;
        }

        // 부모 페이지가 있을 경우 재귀적으로 탐색
        return isDescendantOfStoredPage(parentPage.id);
    } catch (error) {
        console.error('Error in isDescendantOfStoredPage:', error);
        return false; // 에러 발생 시 false 반환
    }
}