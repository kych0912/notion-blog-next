import styles from '../../../styles/page.module.css'
import { Typography } from '@mui/material';

const Post = ({ params }: { params: { user: string } }) => {


    return(
        <>
            <Typography sx={{fontWeight:600}}>User : {params.user}</Typography>
        </>
    )  
}

export default Post;

