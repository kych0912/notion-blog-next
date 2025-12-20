'use client'
import {SnackBar} from "../Snackbar/SnackBar";

import HelperText from "./_components/HelperText";

type ErrorType = "snackbar" | "alert" | "helperText";

interface ErrorHandlerProps {
  message: string;
  duration?: number;
  type?: ErrorType;
  resetError?: () => void;
}

export default function ErrorHandler({ 
  message, 
  duration = 3000, 
  type,
  resetError
 }:ErrorHandlerProps){
  if(type === "snackbar") return (
    <SnackBar 
      message={message} 
      type={"error"}
      duration={duration} 
      resetError={resetError}
    />
  );
  if(type === "helperText") return <HelperText message={message} />;  
  if(type === "alert") return <></>;  
}
