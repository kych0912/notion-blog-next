import { Box, Typography, Avatar } from "@mui/material"
import Link from 'next/link'
import Option from '../../PostOption/Option'
import CoverImage from "./PostCoverImage"
import {
    getNotionImage,
} from "@/app/lib/notion-api";
import * as types from "notion-types"

export default function PostProperty({recordMap,user,isAuthor,id,avatar}: {
    recordMap: types.ExtendedRecordMap,
    user:string,
    isAuthor:boolean,
    id:string,
    avatar:string,
    isChild:boolean,
}){
    const keys = Object.keys(recordMap?.block || {});
    const block = recordMap?.block?.[keys[0]]?.value;


    let coverImg = recordMap?.block?.[keys[0]].value.format?.page_cover;

    coverImg = getNotionImage(coverImg, keys, block);
    const publishedTime = new Date(block?.created_time).toLocaleDateString();
    
    return(
        <>
            <Box sx={{display:"flex",pt:1,justifyContent:'space-between',pb:2}}>
                <Box sx={{display:"flex"}}>
                    <Link href={`/${user}`} passHref style={{display:"flex",textDecoration:"none"}}>
                        <Avatar alt={user} src={avatar?avatar:''} sx={{width:"1.5rem",height:"1.5rem",mr:1}}/>
                        <Typography sx={{color:"#6f6f6f"}}>{decodeURIComponent(user)}</Typography>
                    </Link>
                    <Typography sx={{color:"#6f6f6f",mx:1}}>|</Typography>
                    <Typography sx={{color:"#6f6f6f"}}>{publishedTime}</Typography>
                </Box>
                
                {
                    isAuthor &&
                    <Option id={id}/>
                }

            </Box>

            <CoverImage coverImg={coverImg}/>
        </>
    )
}