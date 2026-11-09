import { ContentContainer } from '../../../write.styles';
import { FunnelContainer } from '../../../write.styles';

export default function NotionInputPageContainer({ children }: { children: React.ReactNode }) {
  return (
    <FunnelContainer>
      <ContentContainer>
        <div className="write-section-heading">
          <h2>페이지 불러오기</h2>
        </div>
        {children}
      </ContentContainer>
    </FunnelContainer>
  );
}
