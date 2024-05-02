import styles from '../../../styles/page.module.css'

const Post = ({ params }: { params: { user: string } }) => {

    return(
        <>
            <p>User : {params.user}</p>
        </>
    )  
}

export default Post;

