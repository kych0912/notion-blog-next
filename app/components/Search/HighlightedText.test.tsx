import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it } from 'vitest';

import PostCard from '@/app/components/PostCard/PostCard';

import HighlightedText from './HighlightedText';

it('highlights every literal case-insensitive match', () => {
  const html = renderToStaticMarkup(<HighlightedText text="React와 REACT 이야기" query="react" />);
  expect(html.match(/<mark/g)).toHaveLength(2);
  expect(html).toContain('>React</mark>');
  expect(html).toContain('>REACT</mark>');
});

it.each(['C++ (v2)? [ok]', '.*', '$HOME', 'a\\b'])(
  'treats search punctuation literally: %s',
  (query) => {
    const html = renderToStaticMarkup(<HighlightedText text={`앞 ${query} 뒤`} query={query} />);
    expect(html.match(/<mark/g)).toHaveLength(1);
    expect(html).toContain(`>${query}</mark>`);
  },
);

it('keeps user-authored HTML as text', () => {
  const html = renderToStaticMarkup(
    <HighlightedText text="<script>alert(1)</script>" query="script" />,
  );
  expect(html).not.toContain('<script>');
  expect(html).toContain('&lt;');
  expect(html.match(/<mark/g)).toHaveLength(2);
});

it('shows matching categories and brings a late description match into the card excerpt', () => {
  const html = renderToStaticMarkup(
    <PostCard
      id="post"
      user="writer"
      title="개발 이야기"
      caption={`${'앞부분 설명 '.repeat(40)}CLAUDE 도구 사용기`}
      date={new Date('2026-01-01T00:00:00Z')}
      image=""
      avatar=""
      variant="row"
      categoryName="Claude & 개발"
      highlightQuery="claude"
    />,
  );
  expect(html).toContain('post-card__category');
  expect(html).toContain('>Claude</mark>');
  expect(html).toContain('>CLAUDE</mark>');
  expect(html).toContain('&amp; 개발');
});
