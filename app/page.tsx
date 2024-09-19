import { Box } from "@mui/material";
import {Feed} from './components/feed'
import HomeTab from "./components/HomeTab";
import {getLatestPosts} from "@/app/services/post/post"
import { Suspense } from "react";
import WithHeader from "@/app/Layout/WithHeader";

export default async function Home() {
  if(!process.env.NEXT_PUBLIC_BASE_API_URL){
    return null;
  }

  const posts = await getLatestPosts();
  return (
    <WithHeader>
    <Box sx={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"start",
        alignItems:"center",
        minHeight:"100vh",
        backgroundColor:"#f9f9f9",
      }}>
        <Box sx={{ px:2,maxWidth:{md:'900px',lg:"1200px"}, margin:"0 auto",width:"100%" }}>
            <HomeTab/>
            <Suspense fallback={<p>Loading feed...</p>}>
                <Feed posts={posts}/>
            </Suspense>
        </Box>
    </Box>
    </WithHeader>
  );
}
