import { getPage, getNotionImage, getPageBlockContent } from "@/app/lib/notion-api";
import {Grid,Divider, Typography} from '@mui/material'
import PostCard from "../../../components/PostCard/PostCard";
import {Box} from '@mui/material'

async function Feed({posts}:{
    posts: {
        id: string;
        author: string;
        date: Date;
        description: string;
        image:string;
        title:string;
        avatar:string;
    }[]
}){

    return (
        <Box sx={{
            display:'flex',
            flexDirection:"column",
            alignItems:"start",
            justifyContent:"center",
            px:"calc(min(16px, 8vw))",
            margin:"0 auto",
            maxWidth:"720px",
        }}>

            <Typography sx={{fontWeight:700,mt:2,fontSize:'1.25em'}}>모든 포스트</Typography>

            <Divider sx={{width:"100%",mt:1,mb:3}}/>

            {
                posts.length === 0 ?
                <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                    <h1>No posts found</h1>
                </Box>
                :
                <Grid container spacing={'32px'} columns={16} sx={{px:'auto',maxWidth:{md:'1024px',lg:"1700px"}}}>
                    {posts.map((item, index) => {
                        return (
                            <Grid item xs={16} md={8} key={index}>
                                <PostCard
                                    id={item.id}
                                    user={item.author}
                                    caption ={item.description}
                                    date={item.date}
                                    image={item.image}
                                    title={item.title}
                                    avatar={item.avatar}
                                />
                            </Grid>
                        );
                    })}
                </Grid>   
            }
        </Box>
    );
}

export default Feed