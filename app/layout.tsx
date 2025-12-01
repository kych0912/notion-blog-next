import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import AuthProvider from "./lib/next-auth/provider";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./styles/theme";
import "./styles/global.css";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import Analytics from "./components/GA/Analytics";
import ReactQueryProvider from "./utils/Provier";
import { FeedbackProvider } from "./context/FeedbackContext";
import { ErrorProvider } from "./context/ErrorContext";

import { pretendard } from "./styles/fonts/fonts";
import { getMetadata } from "./components/MetaData/getMetaData";

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata();
};

export default async function RootLayout({
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
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <Analytics id={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
        <ErrorProvider>
          <FeedbackProvider>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProvider theme={theme}>
                <AuthProvider>
                  <CssBaseline />
                  <ReactQueryProvider>{children}</ReactQueryProvider>
                </AuthProvider>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </FeedbackProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
