'use client'

import React from "react";

import RefetchPage from "./_components/RefetchPage/RefetchPage";

interface IGlobalErrorProps {
    children: React.ReactNode;
}

interface IGlobalErrorState {
    shouldHandleError: boolean;
    error: Error | null;
}

export default class GlobalErrorBoundary extends React.Component<IGlobalErrorProps, IGlobalErrorState> {
    constructor(props: IGlobalErrorProps) {
        super(props);
        this.state = {
            shouldHandleError: false,
            error: null
        };
    }

    static getDerivedStateFromError(error: Error) {
        return {
            shouldHandleError: true,
            error
        };
    }

    private isNetworkError(error: Error | null) {
        return error?.name === "TypeError" && 
            (error.message.includes("CORS") || error.message.includes("Network"));
    }

    render() {
        if (!this.state.shouldHandleError) {
            return this.props.children;
        }

        if (this.isNetworkError(this.state.error)) {
            return (
                <RefetchPage 
                    message="네트워크 오류가 발생했습니다."
                    refetch={() => this.setState({ shouldHandleError: false })} 
                />
            );
        }

        return (
            <RefetchPage 
                message="서버 오류가 발생했습니다."
                refetch={() => this.setState({ shouldHandleError: false })} 
            />
        );
    }
}
