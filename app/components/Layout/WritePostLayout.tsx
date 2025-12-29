import Header from '@/app/components/header/Header';

export default function WritePostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <Header />
      <div className="flex h-full flex-1">{children}</div>
    </div>
  );
}
