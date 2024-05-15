'use client'

import React from "react";
import NewPost from "./_pages/NewPost";
import Header from "./_pages/Header"
import LoadingPage from "./_pages/LoadingPage";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const PathArr = [
    "wrtie",
    "loading"
]

export default function Page(){

    const [params,setParams] = useParams();
    const router = useRouter();
    const [step,setStep] = React.useState<"write"|"loading">();

    return(
        <>
            <Header onBack={()=>router.back()}/>

            {
                step === "write" && <NewPost 
                    onNext={()=>setStep("loading")}
                    nextStep="loading"
                />
            }

            {
                step === "loading" && <LoadingPage 
                    
                />
            }
        </>
    )
}