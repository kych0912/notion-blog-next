'use client'

import React, { useEffect } from "react";
import NewPost from "./_pages/NewPost";
import Description from "./_pages/WriteDescription";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";


export default function Page(){

    const params = useSearchParams();
    const router = useRouter();
    const [step,setStep] = React.useState<"write"|"description">();
    const [url,setUrl] = React.useState<string|undefined>();
    const [description,setDescription] = React.useState<string|undefined>();

    useEffect(()=>{
        const step = params.get("step");
        setStep(step as "write"|"description");
    },[params.get("step")])

    return(
        <>

            {
                step === "write" && <NewPost 
                    nextStep="description"
                    setUrl={setUrl}
                    url={url}
                />
            }

            {
                step === "description" && <Description 
                    nextStep="loading"
                    setDescription={setDescription}
                    description={description}
                />
            }


        </>
    )
}