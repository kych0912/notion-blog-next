import '@/app/styles/write.css';

import type { Metadata } from 'next';

import WritePostLayout from '@/app/components/Layout/WritePostLayout';

import Providers from './providers';

export const metadata: Metadata = {
  title: '글쓰기 - NextBlog',
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <WritePostLayout>{children}</WritePostLayout>
    </Providers>
  );
}
