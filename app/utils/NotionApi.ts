import * as types from 'notion-types'

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

    let description:string[] = [];  

    for(let i = 1; i < keys.length; i++) {
        const block = recordMap?.block?.[keys[i]]?.value?.properties;
        
        if (!block || !block.title || !block.title[0]) continue;

        const title = block.title[0];
        const type = recordMap?.block?.[keys[i]]?.value?.type;
        if (block && type === 'text') {
            description.push(title);
        }
    }

    return getDescriotion(description);
}

const getDescriotion = (blocks:string[]):string => {
    let description:string[] = [];

    for(let i = 0;i<blocks.length;i++){
        for(let j=0;j<blocks[i].length;j++){
            description.push(blocks[i][j])
        }
    }

    return description.find(block => (block.length > 50)&&(block.length < 150)) ?? '';
}