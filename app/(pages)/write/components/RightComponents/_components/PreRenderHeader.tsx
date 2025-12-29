import { ExtendedRecordMap } from 'notion-types';

import PostTitle from '@/app/components/PostDetail/_components/PostTitle';

export default function PreRenderHeader({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center justify-center px-[calc(min(16px,8vw))] py-3">
      <div className="w-full">
        <PostTitle recordMap={recordMap} />
      </div>
    </div>
  );
}
