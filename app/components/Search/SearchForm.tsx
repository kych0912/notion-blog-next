import { Search } from 'lucide-react';

export default function SearchForm({
  query = '',
  user = '',
  variant = 'default',
}: {
  query?: string;
  user?: string;
  variant?: 'default' | 'compact';
}) {
  const compact = variant === 'compact';
  return (
    <form
      action="/search"
      method="get"
      role="search"
      className={`post-search${compact ? ' post-search--compact' : ''}`}
    >
      <label htmlFor="post-search-query" className={compact ? 'sr-only' : undefined}>
        글 검색
      </label>
      <div className="post-search__controls">
        <input
          id="post-search-query"
          name="q"
          type="search"
          maxLength={200}
          placeholder={compact ? '읽고 싶은 글 검색…' : '제목, 설명, 카테고리 검색…'}
          autoComplete="off"
          defaultValue={query}
          required
        />
        {user ? <input type="hidden" name="user" value={user} /> : null}
        <button type="submit" aria-label={compact ? '글 검색' : undefined}>
          {compact ? <Search size={19} aria-hidden="true" /> : '검색'}
        </button>
      </div>
    </form>
  );
}
