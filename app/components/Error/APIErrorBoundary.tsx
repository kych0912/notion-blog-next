import React from "react";

interface IErrorState{
    hasError:boolean
}
    
export default class ApiErrorBoundary extends React.Component<{children:React.ReactNode}, IErrorState>{
	constructor(props:any) {
		super(props);
		this.state = { hasError: false }; 
	}

	static getDerivedStateFromError(error:any) {
        return { hasError: true };
	}

	render() {
		if(this.state.hasError) {
            return <h1>에러 발생!</h1>;
        }

		return this.props.children;
	}
}
