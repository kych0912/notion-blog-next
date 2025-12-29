'use client';

import { getPageTitle } from 'notion-utils';
import { ExtendedRecordMap } from 'notion-types';

export default function PostTitle({
  recordMap,
}: Readonly<{
  recordMap: ExtendedRecordMap;
}>) {
  const title = getPageTitle(recordMap);

  return <h1 className="text-[1.875rem] font-bold">{title}</h1>;
}
