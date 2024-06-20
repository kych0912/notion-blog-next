import { Box } from "@mui/material";
import {Feed} from './components/feed'
import HomeTab from "./components/HomeTab";
import {getLatestPosts} from "@/app/services/post/post"

export default async function Home() {
  const posts = await getLatestPosts();
  if(!process.env.NEXT_PUBLIC_BASE_API_URL){
    return null;
  }

  return (
    <Box sx={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"start",
        alignItems:"center",
        minHeight:"100vh",
        backgroundColor:"#f9f9f9",
      }}>
        <Box sx={{ px:2. }}>
            <HomeTab/>
            <Feed posts={posts}/>
        </Box>
    </Box>
  );
}
