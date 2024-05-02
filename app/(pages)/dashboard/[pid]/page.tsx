import styles from '../../../styles/page.module.css'

const Post = ({ params }: { params: { pid: number } }) => {

    return(
        <>
            <p>Post : {params.pid}</p>
        </>
    )  
}

export default Post;

