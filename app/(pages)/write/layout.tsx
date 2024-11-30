import WritePostLayout from "@/app/components/Layout/WritePostLayout";
import ContextProvider from "./_pages/ContextProvider";
import { ErrorProvider } from "@/app/context/ErrorContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <WritePostLayout>
      <ErrorProvider>
        <ContextProvider> 
          {children}
        </ContextProvider>
      </ErrorProvider>
    </WritePostLayout>
  );
}
