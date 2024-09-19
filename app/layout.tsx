import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./styles/theme";
import "./styles/global.css";

import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'

import ReactQueryProvider from "./utils/Provier";

export const metadata: Metadata = {
  title: "nextblog",
  description: "노션으로 작성하는 블로그 서비스",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body style={{}}>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <ReactQueryProvider>
                  {children}
                </ReactQueryProvider>
                </ThemeProvider>
            </AppRouterCacheProvider>
      </body>
    </html>
  );
}
