'use client'

import { createContext, useContext } from "react";
import { useState } from "react";

type ErrorContextType = {
    error: any;
    setError: (error: any) => void;
};

export const ErrorContext = createContext<ErrorContextType>({
    error: null,
    setError: () => {}
});

export function ErrorProvider({ children }: { children: React.ReactNode }) {
    const [error, setError] = useState<any>(null);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {children}
        </ErrorContext.Provider>
    );
}

// 커스텀 훅
export function useError() {
    if(!ErrorContext) throw new Error('useError must be used within an ErrorProvider');
    return useContext(ErrorContext);
}   