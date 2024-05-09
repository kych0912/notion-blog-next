import { NotionAPI } from 'notion-client'
import * as types from 'notion-types'

const notion = new NotionAPI()

export async function getPage(id:string) {
    return await notion.getPage(id)
}

export function getNotionImage(url:string,keys:string[], block:types.Block){
    if(url){
        url = `https://www.notion.so${
            url.startsWith('/image') ? url : `/image/${encodeURIComponent(url)}`
        }`

        const notionImageUrlV2 = new URL(url)
        let table = block.parent_table === 'space' ? 'block' : block.parent_table
        if (table === 'collection' || table === 'team') {
            table = 'block'
        }
        notionImageUrlV2.searchParams.set('table', table)
        notionImageUrlV2.searchParams.set('id', keys[0])
        notionImageUrlV2.searchParams.set('cache', 'v2')

        url = notionImageUrlV2.toString()
        return url;
    }
    else{
        return null;
    }
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