import Link from 'next/link';

import { normalizeNotionImageUrl } from '@/app/utils/NotionApi';
import { searchExcerpt } from '@/app/lib/search';
import HighlightedText from '@/app/components/Search/HighlightedText';

import PostCardLoading from './PostCardLoading';

const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'Asia/Seoul',
});

export type PostCardVariant = 'card' | 'featured' | 'row';

export default function PostCard({
  id,
  user,
  caption,
  date,
  title,
  image,
  avatar,
  isLoading = false,
  variant = 'card',
  headingLevel: Heading = 'h2',
  categoryName,
  highlightQuery,
}: {
  id: string;
  user: string;
  authorSlug?: string | null;
  caption: string;
  date: Date;
  title: string;
  image: string;
  avatar: string;
  isLoading?: boolean;
  variant?: PostCardVariant;
  headingLevel?: 'h2' | 'h3';
  categoryName?: string | null;
  highlightQuery?: string;
}) {
  const excerptLength = variant === 'row' ? 90 : 110;
  const excerpt = searchExcerpt(caption, highlightQuery, excerptLength);

  return (
    <article className={`post-card post-card--${variant}`} aria-busy={isLoading || undefined}>
      {isLoading ? (
        <PostCardLoading />
      ) : (
        <Link
          href={`/${encodeURIComponent(user)}/${encodeURIComponent(id)}`}
          prefetch={false}
          className="post-card__link"
        >
          <div className="post-card__media">
            <img
              className="post-card__image"
              src={image ? normalizeNotionImageUrl(image) : '/Default_Image.jpeg'}
              alt=""
              width={640}
              height={480}
              loading={variant === 'featured' ? 'eager' : 'lazy'}
              fetchPriority={variant === 'featured' ? 'high' : 'auto'}
              decoding="async"
            />
          </div>
          <div className="post-card__content">
            {categoryName ? (
              <span className="post-card__category">
                <HighlightedText text={categoryName} query={highlightQuery} />
              </span>
            ) : null}
            <Heading className="post-card__title">
              <HighlightedText text={title || '제목 없는 글'} query={highlightQuery} />
            </Heading>
            {caption ? (
              <p className="post-card__summary" title={caption}>
                <HighlightedText text={excerpt} query={highlightQuery} />
              </p>
            ) : null}
            <div className="post-card__meta">
              <span className="post-card__author">
                {avatar ? (
                  <img
                    src={avatar}
                    alt=""
                    width={24}
                    height={24}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="post-card__avatar-fallback" aria-hidden="true">
                    {user.slice(0, 1)}
                  </span>
                )}
                <span>{user}</span>
              </span>
              <time dateTime={date.toISOString()}>{dateFormatter.format(date)}</time>
            </div>
          </div>
        </Link>
      )}
    </article>
  );
}
