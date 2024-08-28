import DefaultLayout from "@/app/Layout/DefaultLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <DefaultLayout>
            {children}
    </DefaultLayout>
  );
}
