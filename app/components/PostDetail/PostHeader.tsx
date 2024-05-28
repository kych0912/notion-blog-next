import {Box,Typography} from '@mui/material'
import {
    getPageTitle,
} from "notion-utils"
import {
    getNotionImage,
    getPage
} from "@/app/lib/notion-api";
import * as types from "notion-types"

export default async function PostHeader({recordMap,user}: {recordMap: types.ExtendedRecordMap,user:string}){
    const keys = Object.keys(recordMap?.block || {});
    const block = recordMap?.block?.[keys[0]]?.value;


    let coverImg = recordMap?.block?.[keys[0]].value.format?.page_cover;

    coverImg = getNotionImage(coverImg, keys, block);
    const title = getPageTitle(recordMap);
    const publishedTime = new Date(block?.created_time).toLocaleDateString();
    
    return(
        <Box sx={{
            display:'flex',
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            px:"calc(min(16px, 8vw))",
            margin:"0 auto",
            maxWidth:"720px",
        }}>
            <Box sx={{width:"100%"}}>
                <img src={coverImg} alt="coverImg" style={{
                    objectFit:"cover",
                    height:'20rem',
                    objectPosition:"center",
                    borderRadius:"1rem",
                    width:"100%"
                }}/>
            </Box>
            <Box sx={{width:"100%"}}>
                <Typography sx={{
                    fontSize:"1.875rem",
                    fontWeight:700
                }}>{title}</Typography>

                <Box sx={{display:"flex",pt:2}}>
                    <Typography sx={{color:"f4f4f4"}}>{user}</Typography>
                    <Typography sx={{color:"f4f4f4",mx:1}}>|</Typography>
                    <Typography sx={{color:"f4f4f4"}}>{publishedTime}</Typography>
                </Box>

            </Box>
        </Box>
    )
}