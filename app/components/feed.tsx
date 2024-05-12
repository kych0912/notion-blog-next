import { getPage, getNotionImage, getPageBlockContent } from "@/app/lib/notion-api";
import {Grid} from '@mui/material'
import PostCard from "./PostCard";
import {Box} from '@mui/material'
import { getPageTitle,
        getPageContentBlockIds ,
        getBlockCollectionId
    } from "notion-utils";
import * as types from 'notion-types'

const FeedArr = [
    {
        id:"0b393534-de11-4dc1-b395-d1d3db873cb7",
        user:"kych0912"
    },
    {
        id:"fc8a808407fb4a5ca9fb499b17c79ed7",
        user:"kych0912"
    },
    {
        id:"cc9367e4-4ff6-4241-8189-9f3cf250f5d2#162ece7b-e09f-4711-92a1-7100aa27aeb6",
        user:"kych0912"
    },
    {
        id:"067dd719a912471ea9a3ac10710e7fdf",
        user:"kych0912"
    }
]
// const FeedArr = [
//     "fc8a808407fb4a5ca9fb499b17c79ed7",
// ]


async function Feed(){
    let recordMaparr: {
        recordMap: types.ExtendedRecordMap,
        user: string,
        id:string
    }[] = [];

    let PostCardArr: {
        title?: string,
        coverImg?: string,
        description?: string,
        publishedTime?: string,
        user?: string,
        id?: string
    }[] = [];

    for (const obj of FeedArr) {
        const recordMap: types.ExtendedRecordMap = await getPage(obj.id);
        const user:string = obj.user;

        recordMaparr.push({
            recordMap,
            user,
            id:obj.id
        });
    }

    for(const recordMap of recordMaparr){
        const keys = Object.keys(recordMap.recordMap?.block || {});
        const block = recordMap.recordMap?.block?.[keys[0]]?.value;

        // console.log(recordMap?.block?.[keys[1]].value.properties?.title[0][0])
        const description = getPageBlockContent(recordMap.recordMap, keys);

        let coverImg = recordMap.recordMap?.block?.[keys[0]].value.format?.page_cover;

        coverImg = getNotionImage(coverImg, keys, block);

        const title = getPageTitle(recordMap.recordMap);
        const publishedTime = new Date(block?.created_time).toLocaleDateString();

        const user = recordMap.user;
        const id = recordMap.id;

        PostCardArr.push({
            title,
            coverImg,
            description,
            publishedTime,
            user,
            id
        })
    }

    return (
        <>
            <Grid container spacing={'32px'} columns={16} sx={{px:'auto',maxWidth:{md:'1024px',lg:"1400px"}}}>
                {PostCardArr.map((item, index) => {
                    return (
                        <Grid item xs={16} md={8} lg={4} key={index}>
                            <PostCard
                                content = {item}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
}

export {Feed}