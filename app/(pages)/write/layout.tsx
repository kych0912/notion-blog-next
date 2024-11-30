import WritePostLayout from "@/app/components/Layout/WritePostLayout";
import ContextProvider from "./_pages/ContextProvider";
import { ErrorProvider } from "@/app/context/ErrorContext";
import { FeedbackProvider } from "@/app/context/FeedbackContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <WritePostLayout>
      <ErrorProvider>
        <FeedbackProvider>
          <ContextProvider> 
            {children}
          </ContextProvider>
        </FeedbackProvider>
      </ErrorProvider>
    </WritePostLayout>
  );
}
