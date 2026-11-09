import { createRequire } from 'node:module';

import type { NextAuthConfig } from 'next-auth';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import '@/auth';

const { authConfig, getUserInfoByEmail, createUser, updateUser } = vi.hoisted(() => ({
  authConfig: {} as NextAuthConfig,
  getUserInfoByEmail: vi.fn(),
  createUser: vi.fn(),
  updateUser: vi.fn(),
}));

vi.mock('next-auth', () => ({
  default: (config: NextAuthConfig) => {
    Object.assign(authConfig, config);
    return { handlers: {}, auth: vi.fn(), signIn: vi.fn(), signOut: vi.fn() };
  },
}));

vi.mock('@/app/server/queries/user', () => ({
  getUserInfoByEmail,
  createUser,
  updateUser,
}));

// Exercise the same Auth.js core installed by next-auth without Next.js's request context.
const require = createRequire(import.meta.url);
const corePath = require.resolve('@auth/core', { paths: [require.resolve('next-auth')] });
const { Auth } = (await import(corePath)) as {
  Auth: (request: Request, config: NextAuthConfig) => Promise<Response>;
};

const origin = 'https://blog.example';
const profile = {
  id: 123,
  login: 'test-author',
  name: 'Test Author',
  avatar_url: 'https://avatars.githubusercontent.com/u/123',
  email: 'author@example.com',
};

function createAuthClient() {
  const cookies = new Map<string, string>();
  const errors = vi.fn();
  const config: NextAuthConfig = {
    ...authConfig,
    providers: authConfig.providers.map((provider) => {
      const resolved = typeof provider === 'function' ? provider() : provider;
      return { ...resolved, clientId: 'test-client', clientSecret: 'test-client-secret' };
    }),
    secret: 'local-github-login-regression-test',
    trustHost: true,
    basePath: '/api/auth',
    logger: { error: errors, warn: vi.fn(), debug: vi.fn() },
  };

  async function request(path: string, init?: RequestInit) {
    const headers = new Headers(init?.headers);
    headers.set('cookie', [...cookies].map(([name, value]) => `${name}=${value}`).join('; '));
    const response = await Auth(new Request(`${origin}${path}`, { ...init, headers }), config);

    for (const cookie of response.headers.getSetCookie()) {
      const pair = cookie.split(';')[0];
      const separator = pair.indexOf('=');
      cookies.set(pair.slice(0, separator), pair.slice(separator + 1));
    }

    return response;
  }

  return { request, errors };
}

beforeEach(() => {
  vi.clearAllMocks();
  getUserInfoByEmail.mockResolvedValue([{ id: 'existing-blog-user', email: profile.email }]);
  vi.spyOn(globalThis, 'fetch').mockImplementation((input) => {
    const url = new URL(input instanceof Request ? input.url : String(input));

    if (url.href === 'https://github.com/login/oauth/access_token') {
      return Promise.resolve(
        Response.json({ access_token: 'test-access-token', token_type: 'bearer' }),
      );
    }
    if (url.href === 'https://api.github.com/user') {
      return Promise.resolve(Response.json(profile));
    }

    return Promise.reject(new Error(`Unexpected OAuth request: ${url.origin}${url.pathname}`));
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

async function completeGitHubSignIn(issuer?: string) {
  const client = createAuthClient();
  const csrfResponse = await client.request('/api/auth/csrf');
  const { csrfToken } = (await csrfResponse.json()) as { csrfToken: string };
  const signInResponse = await client.request('/api/auth/signin/github', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ csrfToken, callbackUrl: `${origin}/write` }),
  });
  const authorizationUrl = new URL(signInResponse.headers.get('location') ?? '');
  const callbackUrl = new URL('/api/auth/callback/github', origin);
  callbackUrl.searchParams.set('code', 'test-authorization-code');
  const state = authorizationUrl.searchParams.get('state');
  if (state) callbackUrl.searchParams.set('state', state);
  if (issuer) callbackUrl.searchParams.set('iss', issuer);

  const response = await client.request(`${callbackUrl.pathname}${callbackUrl.search}`);
  return { ...client, response };
}

describe('GitHub OAuth callback', () => {
  it('completes sign-in when GitHub includes its issuer in the callback', async () => {
    const { request, response, errors } = await completeGitHubSignIn(
      'https://github.com/login/oauth',
    );

    expect(errors.mock.calls.map(([error]) => String(error))).toEqual([]);
    expect(response.headers.get('location')).toBe(`${origin}/write`);
    const session = (await (await request('/api/auth/session')).json()) as {
      user: { id: string; email: string };
    };
    expect(session.user).toMatchObject({ id: 'existing-blog-user', email: profile.email });
    expect(createUser).not.toHaveBeenCalled();
    expect(updateUser).not.toHaveBeenCalled();
  });

  it('continues to accept callbacks without the optional issuer', async () => {
    const { response, errors } = await completeGitHubSignIn();

    expect(errors).not.toHaveBeenCalled();
    expect(response.headers.get('location')).toBe(`${origin}/write`);
  });

  it('rejects a callback claiming a different issuer', async () => {
    const { response, errors } = await completeGitHubSignIn('https://untrusted.example');

    expect(response.headers.get('location')).toBe(`${origin}/auth/error?error=Configuration`);
    expect(errors).toHaveBeenCalled();
    expect(getUserInfoByEmail).not.toHaveBeenCalled();
  });
});
