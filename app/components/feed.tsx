import {Grid} from '@mui/material'
import PostCard from "./PostCard";


async function Feed({posts}:{
    posts:Iposts[]
}){

    return (
        <>
            <Grid container spacing={'16px'} columns={16} sx={{}}>
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