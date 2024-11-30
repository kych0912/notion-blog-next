'use client'

import { useError } from "@/app/context/ErrorContext";
import ErrorHandler from "./ErrorHandler";

export default function ErrorCatcher(){

    const {error, setError} = useError();
    const resetError = () => setError(null);

    if(!error) return null;

    switch(error?.response?.status){
        case 404:
            return (
                <ErrorHandler 
                    message={'존재하지 않는 페이지입니다.'} 
                    type="snackbar"
                    resetError={resetError}
                />
            )
        case 400:
            return (
                <ErrorHandler 
                    message={'잘못된 요청입니다.'} 
                    type="snackbar"
                    resetError={resetError}
                />
            )
        case 409:
            return (
                <ErrorHandler 
                    message={'이미 존재하는 페이지입니다.'} 
                    type="snackbar"
                    resetError={resetError}
                />
            )   
        default:
            return (
                <ErrorHandler 
                    message={'요청에 실패하였습니다.'} 
                    type="snackbar"
                    resetError={resetError}
                />
            )
    }
}
