import GlobalErrorBoundary from '@/app/components/Error/GlobalErrorBoundary';

import NotionPageContent from './components/RightComponents/NotionPageContent';
import NotionUrlInput from './components/LeftComponents/NotionUrlInput';
import PostActionBar from './components/LeftComponents/_components/PostActionBar';

export default function Page() {
  return (
    <GlobalErrorBoundary>
      <header className="write-page-header">
        <h1>새 글 쓰기</h1>
        <p>Notion 페이지를 불러오고 내용을 확인한 뒤 발행하세요.</p>
      </header>
      <noscript>
        <p className="write-feedback">미리보기와 발행 기능을 사용하려면 JavaScript를 켜주세요.</p>
      </noscript>
      <div className="write-workspace">
        <NotionUrlInput />
        <NotionPageContent />
      </div>
      <PostActionBar />
    </GlobalErrorBoundary>
  );
}
