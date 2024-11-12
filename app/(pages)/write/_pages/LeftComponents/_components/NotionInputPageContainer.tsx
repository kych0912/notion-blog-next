import { ContentContainer } from "../../../write.styles"
import { FunnelContainer } from "../../../write.styles"

export default function NotionPageContainer({
    children,
}:{
    children: React.ReactNode,
}){

    return (
        <FunnelContainer>
            <ContentContainer>
                {children}
                
            </ContentContainer>
        </FunnelContainer>
    );
}