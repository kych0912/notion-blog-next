export const SEARCH_PAGE_SIZE = 12;

export function normalizeSearchTerm(value: string | undefined) {
  return (value ?? '').trim().slice(0, 200);
}

export function escapeSearchPattern(value: string) {
  return `%${value.replace(/[\\%_]/g, '\\$&')}%`;
}

export function searchHref(query: string, page = 1, user = '') {
  const params = new URLSearchParams({ q: query });
  if (user) params.set('user', user);
  if (page > 1) params.set('page', String(page));
  return `/search?${params}`;
}

export function searchExcerpt(text: string, query = '', limit = 90) {
  const term = query.trim();
  const length = Math.max(limit, term.length + 24);
  const match = term ? text.toLowerCase().indexOf(term.toLowerCase()) : -1;
  const start =
    match >= 0 && match + term.length > length
      ? Math.max(0, match - Math.floor((length - term.length) / 2))
      : 0;
  const end = Math.min(text.length, start + length);
  return `${start ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`;
}
