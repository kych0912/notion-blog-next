import {Box,Typography,Avatar} from '@mui/material'
import {
    getPageTitle,
} from "notion-utils"
import {
    getNotionImage,
} from "@/app/lib/notion-api";
import * as types from "notion-types"
import Link from 'next/link'
import Option from '../PostOption/Option';

export default async function PostHeader({recordMap,user,isAuthor,id,avatar}: {recordMap: types.ExtendedRecordMap,user:string,isAuthor:boolean,id:string,avatar:string}){
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
            <Box sx={{width:"100%",pb:2}}>
                <Typography sx={{
                    fontSize:"1.875rem",
                    fontWeight:700
                }}>{title}</Typography>

                <Box sx={{display:"flex",pt:1,justifyContent:'space-between'}}>
                    <Box sx={{display:"flex"}}>
                        <Link href={`/${user}`} passHref style={{display:"flex",textDecoration:"none"}}>
                            <Avatar src={avatar?avatar:''} sx={{width:"1.5rem",height:"1.5rem",mr:1}}/>
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

            </Box>

            <Box sx={{width:"100%"}}>
                
                {
                    coverImg &&
                    <img src={coverImg} alt="coverImg" style={{
                        objectFit:"cover",
                        height:'20rem',
                        objectPosition:"center",
                        borderRadius:"1rem",
                        width:"100%"
                    }}/>
                }

            </Box>
        </Box>
    )
}