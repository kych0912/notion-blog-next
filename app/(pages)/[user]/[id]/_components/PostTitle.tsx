'use client';

import { getPageTitle } from 'notion-utils';

import { usePostContext } from '../_contexts/usePostContext';

export default function PostTitle() {
  const { recordMap } = usePostContext();
  const title = getPageTitle(recordMap);

  return <h1 className="text-[1.875rem] font-bold">{title}</h1>;
}
