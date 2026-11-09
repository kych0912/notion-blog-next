export default function SearchForm({ query = '', user = '' }: { query?: string; user?: string }) {
  return (
    <form action="/search" method="get" role="search" className="post-search">
      <label htmlFor="post-search-query">글 검색</label>
      <div className="post-search__controls">
        <input
          id="post-search-query"
          name="q"
          type="search"
          maxLength={200}
          placeholder="제목, 설명, 카테고리 검색"
          defaultValue={query}
          required
        />
        {user ? <input type="hidden" name="user" value={user} /> : null}
        <button type="submit">검색</button>
      </div>
    </form>
  );
}
