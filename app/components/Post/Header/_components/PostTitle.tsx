'use client';

import { ExtendedRecordMap } from 'notion-types';
import { getPageTitle } from 'notion-utils';

export default function PostTitle({ recordMap }: { recordMap: ExtendedRecordMap }) {
  const title = getPageTitle(recordMap);

  return <h1 className="text-[1.875rem] font-bold">{title}</h1>;
}
