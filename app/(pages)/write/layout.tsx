import WritePostLayout from "@/app/components/Layout/WritePostLayout";
import ContextProvider from "./_pages/ContextProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <WritePostLayout>
      <ContextProvider>
        {children}
      </ContextProvider>
    </WritePostLayout>
  );
}
