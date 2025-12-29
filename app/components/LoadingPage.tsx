import React from 'react';

import { Spinner } from '@/app/components/shared/spinner';

const LoadingPage: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner className="h-8 w-8 text-primary" />
    </div>
  );
};

export default LoadingPage;
