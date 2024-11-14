'use client'

import React from "react";

interface IErrorState{
    hasError:boolean,
    errorStatus:number
}
    
export default class ApiErrorBoundary extends React.Component<{children:React.ReactNode}, IErrorState>{
	constructor(props:any) {
		super(props);
		this.state = { hasError: false, errorStatus: 0 }; 
	}

	static getDerivedStateFromError(error: any) {
        return { 
            hasError: true,
            errorStatus: error.response?.status || error.status
        };
    }

    render() {
        if (this.state.hasError) {
            switch (this.state.errorStatus) {
                case 404:
                    return <h1>페이지를 찾을 수 없습니다</h1>;
                default:
                    return <h1>에러가 발생했습니다</h1>;
            }
        }

		return this.props.children;
	}
}
