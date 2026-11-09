import { describe, expect, it } from 'vitest';

import { normalizeNotionImageUrl } from './NotionApi';

describe('stored Notion cover images', () => {
  it.each(['www.notion.so', 'notion.so'])(
    'updates the legacy %s image host and preserves the block parameters',
    (host) => {
      const path = '/image/attachment%3Afile-id%3Acover.png?table=block&id=page-id&cache=v2';

      expect(normalizeNotionImageUrl(`https://${host}${path}`)).toBe(
        `https://app.notion.com${path}`,
      );
    },
  );

  it('updates built-in Notion covers', () => {
    expect(normalizeNotionImageUrl('https://www.notion.so/images/page-cover/woodcuts_1.jpg')).toBe(
      'https://app.notion.com/images/page-cover/woodcuts_1.jpg',
    );
  });

  it.each([
    'https://app.notion.com/image/cover.png',
    'https://images.unsplash.com/photo-123',
    '/Default_Image.jpeg',
    '',
  ])('preserves other image URLs: %s', (url) => {
    expect(normalizeNotionImageUrl(url)).toBe(url);
  });
});
