import WritePostLayout from '@/app/components/Layout/WritePostLayout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <WritePostLayout>{children}</WritePostLayout>;
}
