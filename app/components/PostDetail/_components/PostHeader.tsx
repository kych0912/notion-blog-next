import * as types from 'notion-types';

import PostTitle from './PostTitle';
import PostProperty from './PostProperty';

export default function PostHeader({
  recordMap,
  user,
  isAuthor,
  id,
  avatar,
  isChild,
  image,
}: {
  recordMap: types.ExtendedRecordMap;
  user: string;
  isAuthor: boolean;
  id: string;
  avatar: string;
  isChild: boolean;
  image: string;
}) {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center justify-center px-[calc(min(16px,8vw))] py-2">
      <div className="w-full">
        <PostTitle recordMap={recordMap} />

        {!isChild && (
          <PostProperty
            recordMap={recordMap}
            user={user}
            isAuthor={isAuthor}
            id={id}
            avatar={avatar}
            isChild={isChild}
            image={image}
          />
        )}
      </div>
    </div>
  );
}
