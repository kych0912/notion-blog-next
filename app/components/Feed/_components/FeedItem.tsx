import { forwardRef } from 'react';
import { Grid } from "@mui/material";
import PostCard from "../../PostCard";

const initialPost = {
    id:"",
    author:"",
    description:"",
    date:new Date(),
    title:"",
    image:`null`,
    avatar:""
}

interface IFeedItemProps {
    post?: Iposts
    isLoading?: boolean
}

const FeedItem = forwardRef<HTMLDivElement, IFeedItemProps>(({ post = initialPost, isLoading = false }, ref) => {
    return (
        <Grid ref={ref} item xs={16} md={8} lg={4} sx={{ width: "100%" }}>
            <PostCard
                id={post.id}
                user={post.author}
                caption={post.description}
                date={post.date}
                title={post.title}
                image={post.image}
                avatar={post.avatar}
                isLoading={isLoading}
            />
        </Grid>
    );
});

FeedItem.displayName = 'FeedItem';

export default FeedItem;