import Header from '@/app/components/header/Header';

export default function WritePostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-dvh w-full flex-col overflow-clip">
      <Header />
      <main id="main-content" className="flex min-h-0 flex-1">
        {children}
      </main>
    </div>
  );
}
