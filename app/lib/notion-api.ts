import { NotionAPI } from 'notion-client'

const notion = new NotionAPI()

export async function getPage(id:string) {
    return await notion.getPage(id)
}
