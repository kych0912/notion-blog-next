import styles from '../../../styles/page.module.css'
import { Typography,Avatar,Box } from '@mui/material';
import User from "./_components/User";
import Feed from "./_components/Feed"
import {getUserPosts} from "@/app/services/post/post"

const Post = async ({ params }: { params: { user: string } }) => {
    const posts = await getUserPosts(params.user);
    return(
        <>  
            <User user={params.user}/>
            
            <Feed posts={posts}/>
        </>
    )  
}

export default Post;

