import WithHeader from "@/app/Layout/WithHeaderLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <WithHeader>
            {children}
    </WithHeader>
  );
}
