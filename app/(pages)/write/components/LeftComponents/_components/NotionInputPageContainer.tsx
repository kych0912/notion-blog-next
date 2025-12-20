import { ContentContainer } from "../../../write.styles"
import { FunnelContainer } from "../../../write.styles"

export default function NotionInputPageContainer({
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