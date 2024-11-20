'use client'

import React from "react";
import ErrorHandler from "./ErrorHandler";
import RefetchPage from "./_components/RefetchPage/RefetchPage";

interface IErrorProps{
    children:React.ReactNode
    isPreservedChildren?:boolean
    key?:string
}

interface IErrorState{
    hasError:boolean,
    shouldHandleError:boolean,
    errorStatus:number
}
    
/**
 * API 요청(GET) 중 발생하는 에러를 처리하는 Error Boundary 컴포넌트
 * Fetcher 컴포넌트 필요
 * 
 * @features
 * - API 에러 상태 코드별 에러 메시지 표시
 * - 에러 발생 시 자식 컴포넌트 대신 에러 UI 표시
 * - key prop 변경 또는 shouldHandleError 상태 변경 시 자식 컴포넌트 리렌더링
 * 
 * @props
 * - children: 감싸질 자식 컴포넌트
 * - isPreservedChildren: 에러 발생 시에도 자식 컴포넌트 유지 여부
 * - key: refetch 조건에 사용될 key값
 * 
 * @example
 * <FetchErrorBoundary key={pageId}>
 *   <NotionRecordMapFetcher pageId={pageId}>
 *     <PreRender />
 *   </NotionRecordMapFetcher>
 * </FetchErrorBoundary>
 */

export default class ApiErrorBoundary extends React.Component<IErrorProps,IErrorState>{
	constructor(props:IErrorProps) {
		super(props);
		this.state = { hasError: false, shouldHandleError:false, errorStatus: 0 }; 
	}

	static getDerivedStateFromError(error: any) {

        if(error?.response?.status){
            return {    
                hasError: true,
            shouldHandleError:true,
                errorStatus: error.response.status
            };
        }
        return {hasError: true, shouldHandleError:true, errorStatus: 500};
    }

    render() {
        //fetcher를 다시 mount하여 refetch
        //shouldHandleError가 false로 변하거나, key가 변경되면 refetch
        if(!this.state.shouldHandleError || this.props.key) return this.props.children;

        if (this.state.hasError) {
            //에러 처리 분기
            //다시 시도를 넣어 state를 변경
            switch (this.state.errorStatus) {
                case 404:
                    return (
                        <>
                            <RefetchPage refetch={()=>this.setState({shouldHandleError:false})}/>
                            <ErrorHandler message="페이지를 찾을 수 없습니다" type="snackbar"/>
                        </>
                    );
                case 400:
                    return (
                        <>
                            <ErrorHandler message="유효하지 않은 Notion URL입니다." type="snackbar"/>
                        </>
                    );
                case 409:
                    return (
                        <> 
                            <ErrorHandler message="이미 존재하는 포스트입니다." type="snackbar"/>
                        </>
                    );
                default:
                    return (
                        <>
                            <ErrorHandler message="서버 에러가 발생했습니다" type="snackbar"/>
                        </>
                    );
            }
        }
        return this.props.children;
	}
}
