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
