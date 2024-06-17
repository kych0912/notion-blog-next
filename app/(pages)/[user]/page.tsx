import styles from '../../../styles/page.module.css'
import { Typography,Avatar,Box } from '@mui/material';
import User from "./_components/User";
import Feed from "./_components/Feed"

const Post = ({ params }: { params: { user: string } }) => {


    return(
        <>  
            <User/>
            
            <Feed/>
        </>
    )  
}

export default Post;

