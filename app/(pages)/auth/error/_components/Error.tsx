'use client';

import { useSearchParams } from 'next/navigation';

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.55 2.87 8.41 6.84 9.77.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.38-3.37-1.38-.45-1.19-1.11-1.5-1.11-1.5-.9-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0112 6.85c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.69.48A10.02 10.02 0 0022 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

const errorMessages = {
  EmailRequired:
    'GitHub 계정에 공개 이메일이 설정되어 있지 않습니다. GitHub 프로필 설정에서 이메일을 공개로 설정해주세요.',
  InvalidProfile: '프로필 정보가 올바르지 않습니다.',
  DatabaseError: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  Default: '로그인 중 오류가 발생했습니다.',
};

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const handleGitHubSettings = () => {
    window.open('https://github.com/settings/emails', '_blank');
  };

  return (
    <>
      <p className="mb-3 text-center text-sm text-gray-800">
        {errorMessages[error as keyof typeof errorMessages] || errorMessages.Default}
      </p>

      {error === 'EmailRequired' && (
        <button
          type="button"
          onClick={handleGitHubSettings}
          className="inline-flex items-center gap-2 rounded-lg bg-[#24292e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2c3238]"
        >
          <GitHubIcon className="text-white" />
          GitHub 이메일 설정으로 이동
        </button>
      )}
    </>
  );
}
