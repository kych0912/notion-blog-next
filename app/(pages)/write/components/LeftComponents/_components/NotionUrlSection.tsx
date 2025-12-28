'use client';

import React from 'react';

import { useNotionUrlValidation } from '../../../hooks/useNotionValidation';

import Input from './Input';
import Information from './Information';

const NotionUrlSection = React.memo(function NotionUrlSection() {
  const { url, setUrl, isError, handleSubmit } = useNotionUrlValidation();
  return (
    <>
      <div className="w-full">
        <Input url={url} setUrl={setUrl} isError={isError} handleSubmit={handleSubmit} />
        {isError && <div className="text-red-500">유효하지 않은 Notion URL입니다.</div>}
        <Information />
      </div>
    </>
  );
});

export default NotionUrlSection;
