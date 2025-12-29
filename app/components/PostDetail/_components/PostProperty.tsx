import * as types from 'notion-types';
import Link from 'next/link';

import Option from '../../PostOption/Option';

import CoverImage from './PostCoverImage';

export default function PostProperty({
  recordMap,
  user,
  isAuthor,
  id,
  avatar,
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
  const keys = Object.keys(recordMap?.block || {});
  const block = recordMap?.block?.[keys[0]]?.value;

  const publishedTime = new Date(block?.created_time).toLocaleDateString();

  return (
    <>
      <div className="flex justify-between pt-2 pb-4">
        <div className="flex items-center">
          <Link href={`/${user}`} className="flex items-center no-underline">
            <img
              alt={user}
              src={avatar ? avatar : ''}
              className="mr-2 h-6 w-6 rounded-full bg-gray-200 object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="text-sm text-muted-foreground">{decodeURIComponent(user)}</span>
          </Link>
          <span className="mx-2 text-sm text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">{publishedTime}</span>
        </div>

        {isAuthor && <Option id={id} />}
      </div>
      <CoverImage coverImg={image} />
    </>
  );
}
