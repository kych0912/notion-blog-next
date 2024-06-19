'use client'

import React, { useEffect } from "react";
import NewPost from "./_pages/NewPost";
import Description from "./_pages/WriteDescription";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import {useUploadPost} from "@/app/react-query/post/mutations";
import CircularProgress from '@mui/material/CircularProgress';
import ErrorSnackbar from "@/app/components/Error/Error";
import { Backdrop } from "@mui/material";
import { AxiosError } from "axios";
import zIndex from "@mui/material/styles/zIndex";

interface ErrorResponse{
    message:string
}

export default function Page(){

    const params = useSearchParams();
    const [errorMessage,setErrorMessage] = React.useState<string>("")
    const [step,setStep] = React.useState<"write"|"description">();
    const [url,setUrl] = React.useState<string|undefined>();
    const [description,setDescription] = React.useState<string|undefined>();

    const {mutate,isPending,isError,error} = useUploadPost();

    const handlePost = () =>{
        const postData = {
            notionUrl:url,
            description:description
        }

        mutate(postData);
    }

    useEffect(()=>{
        const step = params.get("step");
        setStep(step as "write"|"description");
    },[params.get("step")])

    useEffect(()=>{
        if(isError){
            switch((error as AxiosError<ErrorResponse>).response?.data?.message){
                case "Invalid Notion URL":
                    setErrorMessage("올바르지 않은 노션 링크입니다.");
                    break;
                case "Invalid Input":
                    setErrorMessage("입력값을 확인해주세요.");
                    break;
                case "Invalid Token":
                    setErrorMessage("유저 정보를 찾을 수 없습니다.");
                    break;
                case "Token Not Found":
                    setErrorMessage("로그인이 필요합니다.");
                    break;
                case "Post Already Exists":
                    setErrorMessage("이미 존재하는 게시글입니다.");
                    break;
                default:
                    setErrorMessage("알 수 없는 오류가 발생했습니다.");
                    break;   
            }
        }
    },[isError])

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
                    handlePost={handlePost}
                />
            }

            {
                isPending && 
                <>
                    <Backdrop open={true} sx={{zIndex:2000}}/>
                    <CircularProgress color="primary" sx={{
                        position:"fixed",
                        top:"50%",
                        left:"50%",
                        zIndex:2001,
                    }}/>
                </>
            }

            {
                isError && <ErrorSnackbar message={errorMessage}/>
            }

        </>
    )
}