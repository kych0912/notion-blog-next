import LatestFeed from './components/Feed/LatestFeed'
import HomeTab from "./components/HomeTab";
import {getLatestPosts} from "@/app/services/post/post"
import { Suspense } from "react";
import WithHeader from "@/app/components/Layout/WithHeaderLayout";
import { HomePageLayout } from "@/app/components/Layout/HomeLayout";
import FetchErrorBoundary from "@/app/components/Error/FetchErrorBoundary";
import GlobalErrorBoundary from './components/Error/GlobalErrorBoundary';

export default async function Home() {

  return (
    <GlobalErrorBoundary>
      <WithHeader>
        <HomePageLayout>
            <HomeTab/>
            <FetchErrorBoundary>
              <Suspense>
                  <LatestFeed/>
              </Suspense>
            </FetchErrorBoundary>
          </HomePageLayout>
        </WithHeader>
    </GlobalErrorBoundary>
  );
}
