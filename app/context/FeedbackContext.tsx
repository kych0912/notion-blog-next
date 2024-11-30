'use client'

import { useContext,createContext, useState } from "react";

type MessageType = 'info' | 'success' | 'warning';
type DisplayType = 'snackbar' | 'alert';

interface FeedbackType{
    message: string | null;
    type: MessageType;
    displayType: DisplayType;
    setMessageState: (message: string | null, type: MessageType, displayType: DisplayType) => void;
}

const FeedbackContext = createContext<FeedbackType>({
    message: null,
    type: 'info',
    displayType: 'snackbar',
    setMessageState: () => {}
});

export function FeedbackProvider({children}:{children:React.ReactNode}){
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<'info' | 'success' | 'warning'>('info');
    const [displayType, setDisplayType] = useState<'snackbar' | 'alert'>('snackbar');

    const setMessageState = (message: string | null, type: MessageType, displayType: DisplayType) => {
        setMessage(message);
        setType(type);
        setDisplayType(displayType);
    };

    return (
        <FeedbackContext.Provider value={{message, type, displayType, setMessageState}}>
            {children}
        </FeedbackContext.Provider>
    )
}   

export function useFeedback(){
    if(!FeedbackContext) throw new Error('useFeedback must be used within a FeedbackProvider');
    return useContext(FeedbackContext);
}

