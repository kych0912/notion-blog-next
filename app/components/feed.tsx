import { getPage } from "@/app/lib/notion-api";
import {Grid} from '@mui/material'
import PostCard from "./PostCard";

const FeedArr = [
    "0b393534-de11-4dc1-b395-d1d3db873cb7",
    "fc8a808407fb4a5ca9fb499b17c79ed7",
    "cc9367e4-4ff6-4241-8189-9f3cf250f5d2#162ece7b-e09f-4711-92a1-7100aa27aeb6",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
    "067dd719a912471ea9a3ac10710e7fdf",
]

async function Feed(){
    let recordMaparr = [];
    for(const id of FeedArr){
        recordMaparr.push(await getPage(id))
    }

    for(const recordMap of recordMaparr){
        // const keys = Object.keys(recordMap?.block || {})
        // const block = recordMap?.block?.[keys[0]]?.value
        // console.log(getPageTitle(recordMap))
        // console.log(getPageProperty('cover',block,recordMap))
    }
    return(
        <>
            <Grid container spacing={'10px'} columns={16} >
                {
                    FeedArr.map((id,index) => {
                        return(
                            <Grid  id={id} item xs={16} md={8} lg={4} key={index}>
                                <PostCard/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}

export {Feed}