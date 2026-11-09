import Header from '@/app/components/header/Header';

export default function WritePostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="write-layout">
      <Header />
      <main id="main-content" className="write-page site-container">
        {children}
      </main>
    </div>
  );
}
