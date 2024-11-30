import LatestFeed from './components/Feed/LatestFeed'
import HomeTab from "./components/HomeTab";
import {getLatestPosts} from "@/app/services/post/post"
import { Suspense } from "react";
import WithHeader from "@/app/components/Layout/WithHeaderLayout";
import { HomePageLayout } from "@/app/components/Layout/HomeLayout";
import FallbackErrorBoundary from "@/app/components/Error/FallbackErrorBoundary";
import GlobalErrorBoundary from './components/Error/GlobalErrorBoundary';

export default async function Home() {

  return (
    <GlobalErrorBoundary>
      <WithHeader>
        <HomePageLayout>
            <HomeTab/>
            <FallbackErrorBoundary>
              <Suspense>
                  <LatestFeed/>
              </Suspense>
            </FallbackErrorBoundary>
          </HomePageLayout>
        </WithHeader>
    </GlobalErrorBoundary>
  );
}
