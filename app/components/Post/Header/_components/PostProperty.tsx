'use client';

import Link from 'next/link';

import { Badge } from '@/app/components/shared/badge';

import { usePostContext } from '../../../../(pages)/[user]/[id]/_contexts/usePostContext';
import { usePostProperty } from '../_hooks/usePostProperty';
import { usePostCategory } from '../../../../(pages)/[user]/[id]/_hooks/usePostCategory';

import Option from './PostOption';
import CoverImage from './PostCoverImage';

export default function PostProperty() {
  const { user, id } = usePostContext();
  const postProperty = usePostProperty();

  if (!postProperty) return null;

  const { isAuthor, avatar, image, publishedTime } = postProperty;
  const { categoryName } = usePostCategory();

  return (
    <>
      <div className="flex justify-between pt-2 pb-4">
        <div className="flex items-center">
          <Link href={`/${user}`} prefetch={false} className="flex items-center no-underline">
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
          {categoryName && (
            <>
              <span className="mx-2 text-sm text-muted-foreground">|</span>
              <Badge variant="default" className="h-5 px-2 py-0 text-[11px] font-medium">
                {categoryName}
              </Badge>
            </>
          )}
        </div>

        {isAuthor && <Option id={id} />}
      </div>
      <CoverImage coverImg={image} />
    </>
  );
}
