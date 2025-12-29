'use client';
import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

import GithubIcon from '../assets/github_logo_icon_147285.svg';

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function LoginModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const fetchAuthCode = () => {
    signIn('github');
    //window.location.assign(AUTHORIZATION_CODE_URL);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open ? (
        <div className="fixed inset-0 z-[9999]">
          <button
            type="button"
            aria-label="close"
            onClick={handleClose}
            className="absolute inset-0 bg-black/40"
          />

          <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-white p-6 sm:h-[200px] sm:w-[500px] sm:rounded-2xl sm:p-8">
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex w-full justify-end">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-md p-1 hover:bg-gray-100"
                  >
                    <CloseIcon className="text-gray-700" />
                  </button>
                </div>
                <div className="text-xl font-bold text-black">로그인</div>
              </div>

              <button
                type="button"
                onClick={fetchAuthCode}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#171515] text-base font-bold text-white shadow-none hover:bg-[#171515]"
              >
                <Image
                  src={GithubIcon as unknown as string}
                  alt="github"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                깃허브로 로그인
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
