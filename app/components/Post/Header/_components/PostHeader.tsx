import { usePostContext } from '../../../../(pages)/[user]/[id]/_contexts/usePostContext';

import PostTitle from './PostTitle';
import PostProperty from './PostProperty';

export default function PostHeader() {
  const { recordMap } = usePostContext();
  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center justify-center px-[calc(min(16px,8vw))] py-2">
      <div className="w-full">
        <PostTitle recordMap={recordMap} />

        <PostProperty />
      </div>
    </div>
  );
}
