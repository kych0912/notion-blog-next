'use client'

import React from "react";
import ErrorHandler from "./ErrorHandler";

interface IMutationErrorProps {
    children: React.ReactNode
    isPreservedChildren?: boolean
    fallback?: (error: any) => React.ReactNode
}

interface IMutationErrorState {
    hasError: boolean
    errorStatus:number
}

/**
 * Mutation 작업(POST, PUT, DELETE 등) 중 발생하는 에러를 처리하는 Error Boundary
 * 
 * @features
 * - Mutation 에러 처리 (validation 에러, 권한 에러 등)
 * - 에러 발생 시에도 자식 컴포넌트 유지 가능
 * 
 * @props
 * - children: 감싸질 자식 컴포넌트
 * - isPreservedChildren: 에러 발생 시에도 자식 컴포넌트 유지 여부
 * - fallback: 에러 발생 시 표시할 커스텀 UI
 * 
 * @example
 * <MutationErrorBoundary>
 *   <PostForm />
 * </MutationErrorBoundary>
 */
export default class MutationErrorBoundary extends React.Component<IMutationErrorProps, IMutationErrorState> {
    constructor(props: IMutationErrorProps) {
        super(props);
        this.state = {
            hasError: false,
            errorStatus:0
        };
    }

    static getDerivedStateFromError(error: any) {
        return {
            hasError: true,
            errorStatus:error.response.status
        };
    }

    private getErrorMessage(errorStatus:number): string {
        // API 응답 에러 메시지 처리
        switch (errorStatus) {
            case 400:
                return "잘못된 요청입니다.";
            case 401:
                return "로그인을 확인해주세요";
            case 409:
                return "작성된 노션 페이지입니다."
            default:
                return "요청 처리 중 오류가 발생했습니다.";
        }
    }

    private renderError() {
        const { errorStatus } = this.state;

        return (
            <>
                {this.props.children}
                <ErrorHandler message={this.getErrorMessage(errorStatus)} type="snackbar"/>
            </>
        );
    }

    render() {
        if(this.state.hasError) return this.renderError();
        return this.props.children;
    }
}


