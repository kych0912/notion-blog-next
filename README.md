## Link
[nextblog.me](https://nextblog.me)

## SEO

- 대표 주소는 실제 배포 리디렉션과 동일한 `https://www.nextblog.me`입니다.
- `/sitemap.xml`은 등록된 글과 해당 작성자의 현재 프로필 주소를 DB에서 생성합니다.
- `/robots.txt`에서 사이트맵을 안내하며, 글쓰기와 로그인 오류 페이지는 `noindex`로 설정합니다.
- Google Search Console과 네이버 서치어드바이저의 소유 확인 메타 태그는 각각 `GOOGLE_SITE_VERIFICATION`, `NAVER_SITE_VERIFICATION` 환경 변수에 발급받은 값을 넣으면 활성화됩니다.
- 배포 후 검색 도구에 `https://www.nextblog.me/sitemap.xml`을 제출하고, 대표 글의 URL 검사 및 리치 결과 테스트로 수집 상태를 확인하세요.

## GEO (AI 검색·인용)

- 공개 글은 기존 `robots.txt`의 `User-agent: *` 규칙으로 검색 크롤링을 허용합니다. ChatGPT 검색용 `OAI-SearchBot`과 학습용 `GPTBot` 정책은 서로 독립적입니다. 실제 접근 여부는 호스팅 방화벽과 공식 봇 IP 허용 설정도 함께 확인해야 합니다. [OpenAI 공식 크롤러 안내](https://developers.openai.com/api/docs/bots)
- 글의 코드와 수식은 서버 HTML에 포함합니다. 수식은 HTML과 MathML을 함께 출력해 자바스크립트 실행 없이도 읽을 수 있습니다.
- 화면의 발행·수정 날짜와 `BlogPosting` 데이터는 같은 값을 사용합니다. 글의 작성자와 프로필의 `ProfilePage` 데이터도 같은 Person 식별자를 사용합니다.
- 노션 원문은 제목과 소제목을 명확히 쓰고, 질문에 대한 결론·조건·실제 예시·검증 가능한 출처를 본문에 포함하세요. 요약이나 FAQ를 추가할 때도 원문에 근거한 내용만 사용하세요. [Bing의 콘텐츠 개선 안내](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)
- Google의 AI 검색은 기존 검색 색인과 스니펫 표시 자격을 기반으로 합니다. 별도 AI 전용 파일이나 특수 스키마는 필수가 아닙니다. [Google 공식 안내](https://developers.google.com/search/docs/appearance/ai-features)
- 노출·인용 성과는 Search Console과 Bing Webmaster Tools의 AI Performance에서 확인하고, 실제 유입은 Analytics의 참조 도메인과 함께 보세요. 봇 User-Agent로 받은 HTTP 200 응답만으로 색인이나 인용 여부를 판단하지 않습니다.
