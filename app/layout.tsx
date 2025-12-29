import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';

import AuthProvider from './lib/next-auth/provider';
import './styles/global.css';
import Analytics from './components/GA/Analytics';
import ReactQueryProvider from './utils/Provier';
import { ErrorProvider } from './context/ErrorContext';
import { pretendard } from './styles/fonts/fonts';
import { getMetadata } from './components/MetaData/getMetaData';

export const generateMetadata = (): Metadata => {
  return getMetadata();
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8839634347934414"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        {process.env.NEXT_PUBLIC_GA_ID ? <Analytics id={process.env.NEXT_PUBLIC_GA_ID} /> : null}
        <Toaster position="bottom-center" offset={50} richColors />
        <ErrorProvider>
          <AuthProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </AuthProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
