import SearchForm from '@/app/components/Search/SearchForm';

export default function HomeTab() {
  return (
    <section className="home-intro home-intro--search" aria-labelledby="home-title">
      <div className="home-intro__copy">
        <h1 id="home-title">노션으로 만드는 나만의 블로그</h1>
        <p>노션 페이지를 사람들과 공유하세요.</p>
      </div>
      <SearchForm variant="compact" />
    </section>
  );
}
