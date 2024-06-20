import {Grid} from '@mui/material'
import PostCard from "./PostCard";


async function Feed({posts}:{
    posts: {
        id: string;
        author: string;
        date: Date;
        description: string;
        title:string,
        image:string,
        avatar:string
    }[]
}){

    return (
        <>
            <Grid container spacing={'32px'} columns={16} sx={{px:'auto',minWidth:{md:'900px',lg:"1200px"}}}>
                {posts.map((item, index) => {
                    return (
                        <Grid item xs={16} md={8} lg={4} key={index} sx={{width:"100%"}}>
                            <PostCard
                                id={item.id}
                                user={item.author}
                                caption={item.description}
                                date={item.date}
                                title={item.title}
                                image={item.image}
                                avatar={item.avatar}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
}

export {Feed}