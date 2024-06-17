import { getPage, getNotionImage, getPageBlockContent } from "@/app/lib/notion-api";
import {Grid} from '@mui/material'
import PostCard from "../../../components/PostCard";
import {Box} from '@mui/material'
import { getPageTitle,
    } from "notion-utils";
import * as types from 'notion-types'

const FeedArr :NotionPage[] = [

]
// const FeedArr = [
//     "fc8a808407fb4a5ca9fb499b17c79ed7",
// ]
interface NotionPage{
    id:string,
    user:string
}

interface recordMaparr {
    recordMap: types.ExtendedRecordMap,
    user: string,
    id:string
}

interface PostCardArr {
    title?: string,
    coverImg?: string,
    description?: string,
    publishedTime?: string,
    user?: string,
    id?: string
}


async function Feed(){
    let recordMaparr: recordMaparr[] = [];

    let PostCardArr: PostCardArr[] = [];

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
        <Box sx={{
            display:'flex',
            flexDirection:"column",
            alignItems:"start",
            justifyContent:"center",
            px:"calc(min(16px, 8vw))",
            margin:"0 auto",
            maxWidth:"720px",
        }}>
            {
                PostCardArr.length === 0 ?
                <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                    <h1>No posts found</h1>
                </Box>
                :
                <Grid container spacing={'32px'} columns={16} sx={{px:'auto',maxWidth:{md:'1024px',lg:"1700px"}}}>
                    {PostCardArr.map((item, index) => {
                        return (
                            <Grid item xs={16} md={8} key={index}>
                                <PostCard
                                    content = {item}
                                />
                            </Grid>
                        );
                    })}
                </Grid>   
            }
        </Box>
    );
}

export default Feed