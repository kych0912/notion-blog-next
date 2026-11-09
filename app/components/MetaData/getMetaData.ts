import type { Metadata } from 'next';

import { META } from '@/app/constants/metadata';

export interface GenerateMetadataProps {
  title?: string;
  description?: string;
  asPath?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  author?: { name: string; url: string };
  publishedTime?: string;
  modifiedTime?: string;
}

export function getUserPath(user: string) {
  return `/${encodeURIComponent(user)}`;
}

export function getPostPath(user: string, id: string) {
  return `${getUserPath(user)}/${encodeURIComponent(id)}`;
}

export function getDescription(description?: string) {
  const text = description?.replace(/\s+/g, ' ').trim() || META.description;
  return text.length > 160 ? `${text.slice(0, 159).trimEnd()}…` : text;
}

export function getMetadata({
  title,
  description,
  asPath,
  ogImage,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
}: GenerateMetadataProps = {}): Metadata {
  const pageTitle = title ? `${title} - ${META.siteName}` : META.title;
  const pageDescription = getDescription(description);
  const pageUrl = asPath ? new URL(asPath, META.url).toString() : undefined;
  const imageUrl = new URL(ogImage || META.ogImage, META.url).toString();

  return {
    metadataBase: new URL(META.url),
    // The root layout has no canonical; each public page supplies its own URL.
    alternates: pageUrl ? { canonical: pageUrl } : undefined,
    title: pageTitle,
    description: pageDescription,
    keywords: [...META.keyword],
    authors: author ? [author] : undefined,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      siteName: META.siteName,
      locale: 'ko_KR',
      url: pageUrl,
      images: [{ url: imageUrl, alt: title || META.siteName }],
      ...(type === 'article'
        ? {
            type: 'article',
            publishedTime,
            modifiedTime,
            authors: author ? [author.url] : undefined,
          }
        : { type: 'website' }),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [{ url: imageUrl, alt: title || META.siteName }],
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
      other: process.env.NAVER_SITE_VERIFICATION
        ? { 'naver-site-verification': process.env.NAVER_SITE_VERIFICATION }
        : undefined,
    },
  };
}
