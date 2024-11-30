'use client'
import {SnackBar} from "../Snackbar/SnackBar";

type DisplayType = "snackbar" | "alert";
type MessageType = "success" | "info" | "warning";

interface FeedbackHandlerProps {
  message: string;
  duration?: number;
  DisplayType?: DisplayType;
  MessageType?: MessageType;
  resetFeedback?: () => void;
}

export default function FeedbackHandler({ 
  message, 
  duration = 3000, 
  DisplayType = "snackbar",
  MessageType = "success",
  resetFeedback
 }: FeedbackHandlerProps){
  if(DisplayType === "snackbar") return (
    <SnackBar 
      message={message} 
      type={MessageType}
      duration={duration} 
      resetError={resetFeedback}
    />
  );
  if(DisplayType === "alert") return <></>;  // alert 구현 필요시 추가
}
