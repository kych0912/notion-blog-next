import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { cookies } from 'next/headers';

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';

import AuthProvider from './lib/next-auth/provider';
import './styles/globals.css';
import Analytics from './components/GA/Analytics';
import ReactQueryProvider from './utils/Provier';
import { ErrorProvider } from './context/ErrorContext';
import { pretendard } from './styles/fonts/fonts';
import { getMetadata } from './components/MetaData/getMetaData';
import { ThemeProvider } from './context/ThemeContext';

export const generateMetadata = (): Metadata => {
  return getMetadata();
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('next-blog-theme')?.value;
  const isDark = theme === 'dark';
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${pretendard.className} ${isDark ? 'dark' : ''}`}
      style={{ colorScheme: isDark ? 'dark' : 'light' }}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8839634347934414"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>
          {process.env.NEXT_PUBLIC_GA_ID ? <Analytics id={process.env.NEXT_PUBLIC_GA_ID} /> : null}
          <Toaster position="bottom-center" offset={50} richColors />
          <ErrorProvider>
            <AuthProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </AuthProvider>
          </ErrorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
