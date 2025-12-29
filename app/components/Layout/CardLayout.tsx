export default function CardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <div className="p-2">
        <div className="mx-auto max-w-[56rem] bg-card text-card-foreground px-4 pt-12 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}
