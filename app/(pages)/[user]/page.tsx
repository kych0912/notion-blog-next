import { Typography,Avatar,Box } from '@mui/material';
import User from "./_components/User";
import Feed from "./_components/Feed"
import {getUserInfo} from "@/app/services/user/user"
import { notFound } from 'next/navigation';
import CoverImage from './_components/CoverImage';

const Post = async ({ params }: { params: { user: string } }) => {
    const user = params.user;
    let avatar_url = '';
    let id = '';
    let posts;

    try{
        const _response = await getUserInfo(user);

        avatar_url = _response.data[0][0].avatar;
        id = _response.data[0][0].id;
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
            <CoverImage src={"https://transitivebullsh.it/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252Ff70d3dc6-ce97-4be2-9cde-b86606147b41%252F06.jpg%3Ftable%3Dblock%26id%3D78fc5a4b-88d7-4b0e-824e-29407e9f1ec1%26cache%3Dv2&w=2048&q=75"}/>
            <User avatar={avatar_url} id={id}/>
            
            <Feed posts={posts}/>
        </Box>
    )  
}

export default Post;

