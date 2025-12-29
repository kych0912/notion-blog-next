export const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      <div className="mx-auto w-full px-2 md:max-w-[900px] lg:max-w-[1200px]">{children}</div>
    </div>
  );
};
