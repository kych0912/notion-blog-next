import {Box,Typography,Avatar} from '@mui/material'
import {
    getPageTitle,
} from "notion-utils"
import {
    getNotionImage,
} from "@/app/lib/notion-api";
import * as types from "notion-types"
import PostProperty from './PostProperty';

export default async function PostHeader({recordMap,user,isAuthor,id,avatar,isChild}: {
    recordMap: types.ExtendedRecordMap,
    user:string,
    isAuthor:boolean,
    id:string,
    avatar:string,
    isChild:boolean,
}){
    const title = getPageTitle(recordMap);

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
                <Typography sx={{
                    fontSize:"1.875rem",
                    fontWeight:700
                }}>{title}</Typography>

                {
                    !isChild &&
                    <PostProperty 
                        recordMap={recordMap}
                        user={user}
                        isAuthor={isAuthor}
                        id={id}
                        avatar={avatar}
                        isChild={isChild}
                    />
                }

            </Box>

        </Box>
    )
}