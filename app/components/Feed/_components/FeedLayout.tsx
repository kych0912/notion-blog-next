export default function FeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="home-feed" aria-label="최근 게시글">
      {children}
    </section>
  );
}
