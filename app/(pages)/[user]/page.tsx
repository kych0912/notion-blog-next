import styles from '../../../styles/page.module.css'
import { Typography,Avatar,Box } from '@mui/material';
import User from "./_components/User";
import Feed from "./_components/Feed"
import {getUserInfo} from "@/app/services/user/user"
import { notFound } from 'next/navigation';

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
    catch(err){
        notFound();
    }


    return(
        <>  
            <User avatar={avatar_url} id={id}/>
            
            <Feed posts={posts}/>
        </>
    )  
}

export default Post;

