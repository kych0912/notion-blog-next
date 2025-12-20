import { Suspense } from 'react';

import GlobalErrorBoundary from '@/app/components/Error/GlobalErrorBoundary';
import { writePostAction } from '@/app/(pages)/write/actions';

import NotionPageContent from './_pages/RightComponents/NotionPageContent';
import NotionUrlInput from './_pages/LeftComponents/NotionUrlInput';

export default function Page() {
  return (
    <GlobalErrorBoundary>
      <NotionUrlInput onWrite={writePostAction} />

      <Suspense>
        <NotionPageContent />
      </Suspense>
    </GlobalErrorBoundary>
  );
}
