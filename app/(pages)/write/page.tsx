'use client'

import React, { useEffect } from "react";
import NewPost from "./_pages/NewPost";
import Header from "./_pages/Header"
import LoadingPage from "./_pages/LoadingPage";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";


export default function Page(){

    const params = useSearchParams();
    const router = useRouter();
    const [step,setStep] = React.useState<"write"|"loading">();
    const [url,setUrl] = React.useState<string|undefined>();

    useEffect(()=>{
        const step = params.get("step");
        setStep(step as "write"|"loading");
    },[params.get("step")])

    return(
        <>

            {
                step === "write" && <NewPost 
                    onNext={()=>setStep("loading")}
                    nextStep="loading"
                    setUrl={setUrl}
                />
            }

            {
                step === "loading" && <LoadingPage 
                    
                />
            }
        </>
    )
}