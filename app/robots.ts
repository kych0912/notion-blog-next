import type { MetadataRoute } from 'next';

import { META } from '@/app/constants/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${META.url}/sitemap.xml`,
  };
}
