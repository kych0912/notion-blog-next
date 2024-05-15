'use client'
import React from 'react';
import {useRouter} from 'next/navigation';

export function useStep(){
    const router = useRouter();

    const [step,setStepState] = React.useState<"write"|"loading">("write");

    const setStep = (step:"write"|"loading") =>{
        setStepState(step);
    }   

    return [step,setStep]
}