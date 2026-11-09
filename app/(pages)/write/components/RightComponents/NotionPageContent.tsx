import { WriteFunnelContainer } from '../../write.styles';

import PreRender from './_components/PreRender';

export default function NotionPageContent() {
  return (
    <WriteFunnelContainer>
      <section className="write-preview" aria-labelledby="write-preview-title">
        <div className="write-section-heading">
          <h2 id="write-preview-title">미리보기</h2>
        </div>
        <div className="write-preview-body">
          <PreRender />
        </div>
      </section>
    </WriteFunnelContainer>
  );
}
