'use client';

import type { ExtendedRecordMap } from 'notion-types';

import PostHeader from '@/app/components/Post/Header/_components/PostHeader';
import PostContextProvider from '@/app/components/Post/Header/_providers/PostContextProvider';

import PostTitle from './_components/PostTitle';

type PostHeaderFactoryProps =
  | {
      type: 'preview';
      recordMap: ExtendedRecordMap;
    }
  | {
      type: 'post';
      user: string;
      id: string;
      recordMap: ExtendedRecordMap;
    };

export default function PostHeaderFactory(props: PostHeaderFactoryProps) {
  if (props.type === 'preview') {
    const { recordMap } = props;
    return (
      <div className="mx-auto flex max-w-[720px] flex-col items-center justify-center px-[calc(min(16px,8vw))] py-3">
        <div className="w-full">
          <PostTitle recordMap={recordMap} />
        </div>
      </div>
    );
  }

  return (
    <PostContextProvider user={props.user} id={props.id} recordMap={props.recordMap}>
      <PostHeader />
    </PostContextProvider>
  );
}
