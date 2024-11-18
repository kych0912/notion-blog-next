import { Box } from "@mui/material";
import {Feed} from './components/feed'
import HomeTab from "./components/HomeTab";
import {getLatestPosts} from "@/app/services/post/post"
import { Suspense } from "react";
import WithHeader from "@/app/components/Layout/WithHeaderLayout";
import { HomePageLayout } from "@/app/components/Layout/HomeLayout";

export default async function Home() {

  const posts = await getLatestPosts();
  return (
    <WithHeader>
      <HomePageLayout>
            <HomeTab/>
            <Suspense fallback={<p>Loading feed...</p>}>
                <Feed posts={posts}/>
            </Suspense>
      </HomePageLayout>
    </WithHeader>
  );
}
