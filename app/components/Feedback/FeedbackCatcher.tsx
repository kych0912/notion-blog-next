'use client'

import { useFeedback } from "@/app/context/FeedbackContext";

import FeedbackHandler from "./FeedbackHandler";

export default function FeedbackCatcher() {
    const { message, type, displayType, setMessageState } = useFeedback();
    const resetFeedback = () => setMessageState(null, 'info', 'snackbar');

    if (!message) return null;

    return (
        <FeedbackHandler 
            message={message} 
            DisplayType={displayType} 
            MessageType={type}
            resetFeedback={resetFeedback}
        />
    )
}
