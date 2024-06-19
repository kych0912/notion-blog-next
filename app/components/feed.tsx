import {Grid} from '@mui/material'
import PostCard from "./PostCard";


async function Feed({posts}:{
    posts: {
        id: string;
        author: string;
        date: Date;
        description: string;
    }[]
}){

    return (
        <>
            <Grid container spacing={'32px'} columns={16} sx={{px:'auto',minWidth:{md:'1024px',lg:"1400px"}}}>
                {posts.map((item, index) => {
                    return (
                        <Grid item xs={16} md={8} lg={4} key={index} sx={{width:"100%"}}>
                            <PostCard
                                id={item.id}
                                user={item.author}
                                caption={item.description}
                                date={item.date}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
}

export {Feed}