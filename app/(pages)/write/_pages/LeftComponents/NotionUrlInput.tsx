'use client'

import NotionInputPageContainer from "./_components/NotionInputPageContainer";
import PostActionBar from "./_components/PostActionBar";
import NotionUrlSection from "./_components/NotionUrlSection";

export default function NotionUrlInput() {    

    return(
        <NotionInputPageContainer>

            <NotionUrlSection />

            <PostActionBar/>
        </NotionInputPageContainer>
    )
}