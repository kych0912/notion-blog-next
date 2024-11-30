'use client'

import React from "react";
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
 * <FallbackErrorBoundary key={pageId}>
 *   <NotionRecordMapFetcher pageId={pageId}>
 *     <PreRender />
 *   </NotionRecordMapFetcher>
 * </FallbackErrorBoundary>
 */

class FallbackErrorBoundary extends React.Component<
    IErrorProps,
    IErrorState
> {
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
                        </>
                    );
                case 400:
                    return (
                        <>
                            <RefetchPage refetch={()=>this.setState({shouldHandleError:false})}/>
                        </>
                    );
                case 409:
                    return (
                        <> 
                            <RefetchPage refetch={()=>this.setState({shouldHandleError:false})}/>
                        </>
                    );
                default:
                    return (
                        <>
                            <RefetchPage refetch={()=>this.setState({shouldHandleError:false})}/>
                        </>
                    );
            }
        }
        return this.props.children;
	}
}

// HOC로 감싸서 export
export default FallbackErrorBoundary;
