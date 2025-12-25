import GlobalErrorBoundary from '@/app/components/Error/GlobalErrorBoundary';

import NotionPageContent from './components/RightComponents/NotionPageContent';
import NotionUrlInput from './components/LeftComponents/NotionUrlInput';

export default function Page() {
  return (
    <GlobalErrorBoundary>
      <NotionUrlInput />

      <NotionPageContent />
    </GlobalErrorBoundary>
  );
}
