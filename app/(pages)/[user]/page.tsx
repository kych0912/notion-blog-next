import { Box } from '@mui/material';
import User from "./_components/User";
import Feed from "./_components/Feed"
import {getUserInfoAndPostByName} from "@/app/services/user/user"
import { notFound } from 'next/navigation';
import CoverImage from './_components/CoverImage';

const Post = async ({ params }: { params: { user: string } }) => {
    const user = params.user;
    let avatar_url = '';
    let id = '';
    let posts;

    try{
        const _response = await getUserInfoAndPostByName(user);

        avatar_url = _response.data[0][0].avatar;
        name = _response.data[0][0].name;
        posts = _response.data[1];
    }    
    catch(err:any){
        if (err?.response?.status === 404) {
            notFound();
        }
        
        throw err;
    }


    return( 
        <Box sx={{display:"flex",flexDirection:'column',justifyContent:"center",alignItems:"center"}}>  
            <CoverImage src={"/Default_Image.jpeg"}/>
            <User avatar={avatar_url} name={name}/>
            
            <Feed posts={posts}/>
        </Box>
    )  
}

export default Post;

