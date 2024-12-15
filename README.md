## 기획 의도

1. 개발 배경
- 노션은 뛰어난 문서 작성 도구이지만, 공개적으로 콘텐츠를 공유하기에는 제한적
- 기존 블로그 플랫폼들은 제한적인 글 작성 기능으로 인해 풍부한 콘텐츠 작성에 어려움
- 노션에서 작성한 문서를 블로그로 쉽게 변환하고 공유할 수 있는 솔루션이 필요
- 개발자들이 Github 계정으로 쉽게 기술 블로그를 시작할 수 있는 플랫폼이 필요

1. 개발 목적
- 노션의 편리한 문서 작성 기능을 활용하면서 블로그 형태로 콘텐츠 공유
- URL 입력만으로 노션 페이지를 블로그 포스트로 간편하게 변환
- 노션의 강력한 문서 작성 도구를 통해 기존 블로그 플랫폼의 제한적인 글 작성 기능 보완
    - 피그마 임베드, 외부 객체, 코드블록 등 다양한 노션 기능을 사용할 수 있습니다.
- Github 계정 연동을 통한 간편한 블로그 시작 및 관리
- 노션의 실시간 수정사항이 자동으로 블로그에 반영되는 효율적인 콘텐츠 관리

## 기술 스택

### Frontend

- **Next.js (14)**, **TypeScript**, **React-Query**, **Material UI,** react-notion-x, next-auth 

### DB

- Mysql, EC2

## 시스템 구조
![image](https://github.com/user-attachments/assets/e5d7f5a0-d4b6-43f2-9754-5db5a1f681e2)

```
.
├── .eslintrc.json
├── .gitignore
├── README.md
├── middleware.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── tsconfig.json
├── public
│   ├── Default_Image.jpeg
│   ├── fonts
│   │   └── PretendardVariable.woff2
│   ├── next.svg
│   └── vercel.svg
└── app
   ├── layout.tsx
   ├── page.tsx
   ├── assets
   │   ├── favicon.ico
   │   ├── github_logo_icon_147285.svg
   │   └── react.svg
   ├── api //Serverless API route
   │   ├── auth
   │   │   └── [...nextauth]
   │   │       ├── options.ts
   │   │       └── route.ts
   │   ├── notion
   │   │   └── page
   │   │       └── route.ts
   │   ├── post
   │   │   ├── [user]
   │   │   │   └── [id]
   │   │   │       └── route.ts
   │   │   ├── delete
   │   │   │   └── [id]
   │   │   │       └── route.ts
   │   │   ├── latest
   │   │   │   └── route.ts
   │   │   ├── user
   │   │   │   └── [id]
   │   │   │       └── route.ts
   │   │   └── write
   │   │       └── route.ts
   │   └── user
   │       ├── [id]
   │       │   └── route.ts
   │       ├── auth
   │       │   └── route.ts
   │       ├── route.ts
   │       └── updateUser
   │           └── route.ts
   ├── components //프론트엔드 재사용 컴포넌트
   │   ├── Button
   │   │   └── button.styles.ts
   │   ├── Error
   │   │   ├── ErrorCatcher.tsx
   │   │   ├── ErrorHandler.tsx
   │   │   ├── FallbackErrorBoundary.tsx
   │   │   ├── GlobalErrorBoundary.tsx
   │   │   └── _components
   │   │       ├── HelperText.tsx
   │   │       └── RefetchPage
   │   │           └── RefetchPage.tsx
   │   ├── Feed
   │   │   ├── LatestFeed.tsx
   │   │   └── _components
   │   │       ├── FeedItem.tsx
   │   │       ├── FeedLayout.tsx
   │   │       └── Latest.tsx
   │   ├── Feedback
   │   │   ├── FeedbackCatcher.tsx
   │   │   └── FeedbackHandler.tsx
   │   ├── Fetcher
   │   │   └── NotionRecordMapFetcher.tsx
   │   ├── GA
   │   │   └── Analytics.tsx
   │   ├── HomeTab.tsx
   │   ├── Layout
   │   │   ├── CardLayout.tsx
   │   │   ├── DefaultLayout.tsx
   │   │   ├── HomeLayout.tsx
   │   │   ├── RecoilWrapper.tsx
   │   │   ├── WithHeaderLayout.tsx
   │   │   └── WritePostLayout.tsx
   │   ├── Loading.tsx
   │   ├── LoadingPage.tsx
   │   ├── LoginModal.tsx
   │   ├── Modal
   │   │   └── Modal.tsx
   │   ├── PostCard
   │   │   ├── PostCard.tsx
   │   │   └── PostCardLoading.tsx
   │   ├── PostDetail
   │   │   ├── Post.tsx
   │   │   └── _components
   │   │       ├── PostCoverImage.tsx
   │   │       ├── PostHeader.tsx
   │   │       ├── PostProperty.tsx
   │   │       └── PostTitle.tsx
   │   ├── PostOption
   │   │   └── Option.tsx
   │   ├── Renderer
   │   │   └── NotionPageRenderer.tsx
   │   ├── Snackbar
   │   │   └── SnackBar.tsx
   │   └── header
   │       ├── Header.tsx
   │       └── _components
   │           ├── HeaderRight.tsx
   │           ├── LoggedIn.tsx
   │           ├── NotLoggedIn.tsx
   │           └── UserMenu.tsx
   ├── constants
   │   └── messages.ts
   ├── context //Context API
   │   ├── ErrorContext.tsx
   │   ├── FeedbackContext.tsx
   │   └── NotionPageContext.tsx
   ├── hooks //Custom Hook
   │   └── write
   │       └── useNotionValidation.ts
   ├── lib //DB 호출
   │   ├── UserData
   │   │   └── UserDB.ts
   │   ├── db.ts
   │   ├── jwt.ts
   │   ├── next-auth
   │   │   └── provider.tsx
   │   ├── notion-api.ts
   │   └── postData
   │       └── postDB.ts
   ├── react-query //React-query
   │   ├── post
   │   │   ├── mutations.ts
   │   │   └── queries.ts
   │   └── user
   │       ├── mutations.ts
   │       └── queries.ts
   ├── services //API 호출 함수
   │   ├── post
   │   │   └── post.ts
   │   └── user
   │       └── user.ts
   ├── store
   │   ├── atoms
   │   │   └── notionState.ts
   │   └── index.ts
   ├── styles
   │   ├── fonts
   │   │   └── fonts.ts
   │   ├── global.css
   │   ├── notion.css
   │   ├── page.module.css
   │   ├── reset.css
   │   └── theme.ts
   ├── types
   │   ├── NextAuth.d.ts
   │   ├── content.d.ts
   │   └── login.d.ts
   ├── utils
   │   ├── NotionApi.ts
   │   └── Provier.tsx
   └── (pages) //프론트엔드 페이지
       ├── [user]
       │   ├── [id]
       │   │   ├── error.tsx
       │   │   ├── layout.tsx
       │   │   ├── not-found.tsx
       │   │   └── page.tsx
       │   ├── _components
       │   │   ├── CoverImage.tsx
       │   │   ├── Feed.tsx
       │   │   └── User.tsx
       │   ├── error.tsx
       │   ├── layout.tsx
       │   ├── not-found.tsx
       │   └── page.tsx
       ├── auth
       │   └── error
       │       ├── _components
       │       │   └── Error.tsx
       │       └── page.tsx
       ├── home
       │   └── layout.tsx
       └── write
           ├── _pages
           │   ├── ContextProvider.tsx
           │   ├── LeftComponents
           │   │   ├── NotionUrlInput.tsx
           │   │   └── _components
           │   │       ├── Information.tsx
           │   │       ├── Input.tsx
           │   │       ├── NotionInputPageContainer.tsx
           │   │       ├── NotionUrlSection.tsx
           │   │       ├── PostActionBar.tsx
           │   │       └── UnavailableFeaturesBanner.tsx
           │   └── RightComponents
           │       ├── NotionPageContent.tsx
           │       └── _components
           │           ├── PreRender.tsx
           │           ├── PreRenderHeader.tsx
           │           └── RightComponentsContainer.tsx
           ├── layout.tsx
           ├── page.tsx
           └── write.styles.tsx
```

## 주요 기능
1. 노션 페이지 블로그 포스트로 변환

     ![ezgif-1-38e7d1d176](https://github.com/user-attachments/assets/75c78257-de20-4b4b-9984-d8cb5ef66af3)
    - **react-notion-x**를 활용하여 노션 페이지의 콘텐츠를 자동으로 블로그 포스트로 변환
    - 노션의 텍스트 스타일링, 이미지, 코드 블록 등 서식 유지
    - 실시간 동기화로 노션 페이지 수정사항 자동 반영
    - **노션 페이지 URL 입력만으로 간편하게 포스트 작성 가능**
2. 노션 자식페이지 연동

    ![ezgif-1-5df98bb44d](https://github.com/user-attachments/assets/0ce1511c-3d0b-49e4-9748-058c7d817b51)
    - 메인 노션 페이지의 하위 페이지들을 자동으로 감지하여 블로그 포스트로 변환
    - 새로운 자식 페이지 생성 시 자동으로 블로그에 반영
3. 블로그 기능

    - 작성된 포스트 목록을 한눈에 볼 수 있는 대시보드 제공
    - 직관적인 UI로 포스트 내용 미리보기 및 관리
4. Github OAuth 기능

   ![ezgif-1-353b2c88e8](https://github.com/user-attachments/assets/4cef9c23-7fb2-44b6-8604-d477469fcbb1)
    - Github 계정을 통한 간편한 로그인/회원가입
    - 안전한 사용자 인증 및 권한 관리
    - Github 프로필 정보를 활용한 블로그 프로필 자동 구성

## Link
[nextblog.me](https://nextblog.me)

## 개발 기간
2024.05 ~ 진행중

## Api Docs 
[API Docs](https://github.com/kych0912/notion-blog-next/tree/main/_apidocs)

## Quick Start
### 환경 변수 설정
프로젝트 실행을 위해 .env 파일에 다음 환경변수들을 설정해야 합니다:

| 환경변수 | 설명 | 비고 |
|----------|---------|------|
| **데이터베이스 설정** |||
| DB_HOST | MySQL 데이터베이스 호스트 주소 | |
| DB_USER | 데이터베이스 사용자 이름 | |
| DB_PASSWORD | 데이터베이스 비밀번호 | |
| DB_DATABASE | 사용할 데이터베이스 이름 | |
| **API 설정** |||
| API_PATH | API 기본 경로 | |
| NEXT_PUBLIC_BASE_API_URL | 클라이언트측 API 기본 URL | |
| **GitHub OAuth 설정** |||
| CLIENT_ID | GitHub OAuth 애플리케이션 ID | |
| CLIENT_SECRETS | GitHub OAuth 시크릿 키 | |
| CALLBACK_URL | OAuth 콜백 URL | |
| GITHUB_AUTH_CODE_SERVER | GitHub 인증 코드 서버 | 기본값: '/login/oauth/authorize' |
| GITHUB_AUTH_TOKEN_SERVER | GitHub 토큰 서버 | 기본값: '/login/oauth/access_token' |
| GITHUB_API_SERVER | GitHub API 서버 | 기본값: '/user' |
| **NextAuth 설정** |||
| NEXTAUTH_SECRET | NextAuth 암호화 키 | |
| NEXTAUTH_URL | NextAuth 기본 URL | |
| NEXTAUTH_COOKIE_NAME | 인증 쿠키 이름 | |
| **기타 설정** |||
| SECRET_KEY | 애플리케이션 암호화 키 | |
| DEFAULT_IMAGE | 기본 이미지 경로 | |
| NEXT_PUBLIC_GA_ID | Google Analytics ID | |
## 실행 방법

### 1. 환경 변수 설정
`.env` 파일을 프로젝트 루트 디렉토리에 생성하고 필요한 환경 변수들을 설정합니다.

### 2. 패키지 설치
```bash
npm install
```

### 3. 개발 환경에서 실행
```bash
npm run dev
