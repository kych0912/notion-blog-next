import GlobalErrorBoundary from '@/app/components/Error/GlobalErrorBoundary';

import NotionPageContent from './components/RightComponents/NotionPageContent';
import NotionUrlInput from './components/LeftComponents/NotionUrlInput';
import { PageIdProvider } from './providers/PageIdProvider';

export default function Page() {
  return (
    <GlobalErrorBoundary>
      <PageIdProvider>
        <NotionUrlInput />

        <NotionPageContent />
      </PageIdProvider>
    </GlobalErrorBoundary>
  );
}
