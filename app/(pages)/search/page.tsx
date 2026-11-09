import Link from 'next/link';

import WithHeader from '@/app/components/Layout/WithHeaderLayout';
import { HomePageLayout } from '@/app/components/Layout/HomeLayout';
import PostCard from '@/app/components/PostCard/PostCard';
import SearchForm from '@/app/components/Search/SearchForm';
import { getMetadata } from '@/app/components/MetaData/getMetaData';
import { normalizeSearchTerm, searchHref } from '@/app/lib/search';
import { searchPosts } from '@/app/server/queries/post';

export const metadata = {
  ...getMetadata({ title: '글 검색', asPath: '/search' }),
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; user?: string }>;
}) {
  const params = await searchParams;
  const query = normalizeSearchTerm(typeof params.q === 'string' ? params.q : '');
  const user = typeof params.user === 'string' ? params.user.trim().slice(0, 100) : '';
  const page = /^\d{1,4}$/.test(params.page ?? '')
    ? Math.min(1000, Math.max(1, Number(params.page)))
    : 1;
  const { posts, hasNextPage } = query
    ? await searchPosts(query, page, user)
    : { posts: [], hasNextPage: false };

  return (
    <WithHeader>
      <HomePageLayout>
        <section className="search-page" aria-labelledby="search-title">
          <div className="home-intro">
            <h1 id="search-title">{user ? `${user}의 글 검색` : '글 검색'}</h1>
            <p>읽고 싶은 이야기를 찾아보세요.</p>
          </div>
          <SearchForm query={query} user={user} />
          {user ? (
            <Link className="text-link" href={searchHref(query)}>
              전체 글에서 검색
            </Link>
          ) : null}
          {query ? (
            <section aria-labelledby="search-results-title">
              <h2 id="search-results-title" className="section-title">
                ‘{query}’ 검색 결과
              </h2>
              {posts.length ? (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    user={post.author}
                    title={post.title ?? ''}
                    caption={post.description ?? ''}
                    image={post.image ?? ''}
                    avatar={post.avatar ?? ''}
                    date={new Date(post.date)}
                    variant="row"
                    headingLevel="h3"
                  />
                ))
              ) : (
                <div className="feed-empty">
                  <h3>검색 결과가 없어요.</h3>
                  <p>다른 단어나 카테고리 이름으로 검색해보세요.</p>
                </div>
              )}
              <nav className="search-pagination" aria-label="검색 결과 페이지">
                {page > 1 ? (
                  <Link href={searchHref(query, page - 1, user)} rel="prev">
                    이전
                  </Link>
                ) : null}
                {posts.length || page > 1 ? <span>{page}페이지</span> : null}
                {hasNextPage ? (
                  <Link href={searchHref(query, page + 1, user)} rel="next">
                    다음
                  </Link>
                ) : null}
              </nav>
            </section>
          ) : (
            <p className="search-hint">제목, 설명 또는 카테고리 이름을 입력해주세요.</p>
          )}
        </section>
      </HomePageLayout>
    </WithHeader>
  );
}
