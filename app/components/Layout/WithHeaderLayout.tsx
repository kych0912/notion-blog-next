import Header from '@/app/components/header/Header';

export default function LayoutWithNavbar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
    </>
  );
}
