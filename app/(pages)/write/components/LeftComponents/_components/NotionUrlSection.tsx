'use client';

import React from 'react';

import { useNotionUrlValidation } from '../../../hooks/useNotionValidation';

import Input from './Input';
import Information from './Information';

const NotionUrlSection = React.memo(function NotionUrlSection() {
  const { url, setUrl, isError, handleSubmit } = useNotionUrlValidation();
  return (
    <div className="write-source-content">
      <Input url={url} setUrl={setUrl} isError={isError} handleSubmit={handleSubmit} />
      <Information />
    </div>
  );
});

export default NotionUrlSection;
