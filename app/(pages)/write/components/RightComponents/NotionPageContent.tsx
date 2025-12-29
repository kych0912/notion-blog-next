import { Suspense } from 'react';

import LoadingPage from '@/app/components/LoadingPage';

import { WriteFunnelContainer } from '../../write.styles';

import PreRender from './_components/PreRender';

export default function NotionPageContent() {
  return (
    <WriteFunnelContainer>
      <div className="h-full w-full overflow-y-auto pb-24">
        <Suspense fallback={<LoadingPage />}>
          <PreRender />
        </Suspense>
      </div>
    </WriteFunnelContainer>
  );
}
