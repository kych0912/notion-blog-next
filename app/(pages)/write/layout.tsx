import WritePostLayout from '@/app/components/Layout/WritePostLayout';

import Providers from './providers';

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
