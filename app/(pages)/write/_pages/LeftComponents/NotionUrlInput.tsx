'use client'

import NotionInputPageContainer from "./_components/NotionInputPageContainer";
import PostActionBar from "./_components/PostActionBar";
import NotionUrlSection from "./_components/NotionUrlSection";
import MutationErrorBoundary from "@/app/components/Error/MutateErrorBoundary";
import { useEffect } from "react";

export default function NotionUrlInput() {    

    return(
        <NotionInputPageContainer>

            <NotionUrlSection />

            <MutationErrorBoundary> 
                <PostActionBar/>
            </MutationErrorBoundary>

        </NotionInputPageContainer>
    )
}