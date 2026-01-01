import NextAuth from 'next-auth';
import { User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import GitHub from 'next-auth/providers/github';

import { updateUser, createUser, getUserInfoByEmail } from '@/app/server/queries/user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user }: { user: User | AdapterUser }): Promise<boolean | string> {
      const { id, name, image, email } = user;

      if (!email) {
        return '/auth/error?error=EmailRequired'; // 이메일이 없을 경우 에러 페이지로 리다이렉트
      }

      if (!name || !image || !id) {
        return '/auth/error?error=InvalidProfile'; // 이름이나 이미지가 없을 경우
      }
      try {
        const _UserInfo = await getUserInfoByEmail(email);

        if (Array.isArray(_UserInfo) && _UserInfo.length > 0) {
          return true;
        }
      } catch (err: unknown) {
        console.error(err);
      }

      try {
        const data = await updateUser(id, name, image, email);

        if (data.length === 0) {
          const data = await createUser(name, image, email);

          if (data.length === 0) {
            return '/auth/error?error=DatabaseError'; // DB 생성 실패 시
          }
        }

        return true;
      } catch (err: unknown) {
        console.error(err);
        return '/auth/error?error=DatabaseError'; // DB 업데이트 실패 시
      }
    },
    jwt: ({ token, account }) => {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
});
