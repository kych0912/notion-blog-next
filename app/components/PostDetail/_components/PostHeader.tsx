import {Box} from '@mui/material'
import PostTitle from './PostTitle';
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
                <PostTitle recordMap={recordMap}/>

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