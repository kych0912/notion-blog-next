import {Box, Typography, Avatar} from "@mui/material";
import Link from 'next/link'
import { getPageTitle } from "notion-utils";
import { getPage, getNotionImage, getPageBlockContent } from "@/app/lib/notion-api";
import * as types from 'notion-types'

export default async function PostCard({id,user,caption,date}:{
    id:string,
    user:string,
    caption:string,
    date:Date
}){

    const recordMap: types.ExtendedRecordMap = await getPage(id);

    const keys = Object.keys(recordMap?.block || {});
    const block = recordMap?.block?.[keys[0]]?.value;

    //노션 페이지 글
    //const description = getPageBlockContent(recordMap, keys);

    //사용자가 작성한 description
    const description = caption;

    let coverImg = recordMap?.block?.[keys[0]].value.format?.page_cover;

    coverImg = getNotionImage(coverImg, keys, block);

    const title = getPageTitle(recordMap);

    //notion 페이지 생성 시간
    // const publishedTime = new Date(block?.created_time).toLocaleDateString();

    const publishedTime = new Date(date).toLocaleDateString();

    return (
        <Box sx={{
            display:"flex",
            flexDirection:"column",
            transition:'transform .25s ease-in',
            width:"100%",
            borderRadius:'0.5rem',
            backgroundColor:"#fff"
        }}
        >
            <Link href={`/${user}/${id}`} scroll={true}  style={{ textDecoration: "none"}}>
                <Box sx={{width:"100%"}}>
                {
                    coverImg &&
                    <img className="feedImg" src={coverImg} alt={title}/>||
                    <img className="feedImg" src="https://via.placeholder.com/150" alt={title}/>
                }
                </Box>
                <Box sx={{p:'1rem',width:"100%"}}>
                    <Box sx={{}}>
                        <Typography sx={{fontSize:'1rem',fontWeight:700,color:"black"}}>{title}</Typography>
                        <Box>
                            <Typography 
                                style={{WebkitLineClamp:3,WebkitBoxOrient:'vertical'} as any}
                                sx={{
                                    fontSize:'0.875rem',
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    height:'4rem',
                                    wordWrap:"break-word",
                                    wordBreak:"break-word",
                                    color:"black",
                                    mt:1
                                }}>
                                {description}
                            </Typography>
                        </Box>
                        <Typography sx={{fontSize:"0.75rem",color:"black"}}>{publishedTime}</Typography>
                    </Box>
                    <Box sx={{display:'flex',alignItems:"center",pt:1}}>
                        <Avatar sx={{width:"1.5rem",height:"1.5rem"}}/>
                        <Typography sx={{fontSize:"0.75rem",ml:1.5,color:"black"}}>{user}</Typography>
                    </Box>
                </Box>
            </Link>
        </Box>
    )
}