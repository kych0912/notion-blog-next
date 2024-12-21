## 기획 의도

1. 개발 배경
- 노션은 뛰어난 문서 작성 도구이지만, 공개적으로 콘텐츠를 공유하기에는 제한적
- 기존 블로그 플랫폼들은 제한적인 글 작성 기능으로 인해 풍부한 콘텐츠 작성에 어려움
- 노션에서 작성한 문서를 블로그로 쉽게 변환하고 공유할 수 있는 솔루션이 필요

<br/>

2. 개발 목적
- 노션의 편리한 문서 작성 기능을 활용하면서 블로그 형태로 콘텐츠 공유
- URL 입력만으로 노션 페이지를 블로그 포스트로 간편하게 변환
- 노션의 강력한 문서 작성 도구를 통해 기존 블로그 플랫폼의 제한적인 글 작성 기능 보완
    - 피그마 임베드, 외부 객체, 코드블록 등 다양한 노션 기능을 사용할 수 있습니다.

## 기술 스택

### Frontend

- **Next.js (14)**, **TypeScript**, **React-Query**, **Material UI,** react-notion-x, next-auth 

### DB

- Mysql, EC2


## 시스템 구조
![image](https://github.com/user-attachments/assets/e5d7f5a0-d4b6-43f2-9754-5db5a1f681e2)

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
![image](https://github.com/user-attachments/assets/fcb11647-ea78-4602-9dbe-5217f18466ff)
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

## 트러블 슈팅
### ⭐React Query 캐싱 도입으로 노션 블로그 페이지 이동 성능 최적화: API 호출 50% 감소 및 응답시간 60% 단축 (460ms → 185ms)
https://www.nextblog.me/YoungCheon%20Kim/163e895f-ae86-8015-a966-fe0b74e618aa

### ⭐ Context API의 **불필요한 구독 패턴 제거**를 통한 컴포넌트 렌더링 최적화로 성능 **14.3% 개선** (47.7ms → 40.9ms)
https://www.nextblog.me/YoungCheon%20Kim/163e895f-ae86-80b7-9b94-ed4a3ec2ecb3


### ⭐ 노션 블로그의 하위 페이지 404 에러를 Bottom-Up 검증 방식 도입으로 해결하여 업로드 시간 91.7% 개선 (19.86s → 1.64s) 및 안정적인 검증 시간 유지
https://www.nextblog.me/YoungCheon%20Kim/163e895f-ae86-8071-a8ba-f61a6e39c697

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
