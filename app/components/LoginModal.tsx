'use client';
import React from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { X } from 'lucide-react';

import GithubIcon from '../assets/github_logo_icon_147285.svg';

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

  if (!open) return null;

  return createPortal(
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-card p-6 text-card-foreground sm:h-[200px] sm:w-[500px] sm:rounded-2xl sm:p-8">
          <div className="flex h-full flex-col justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex w-full justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-md p-1 hover:bg-muted"
                >
                  <X className="text-muted-foreground" />
                </button>
              </div>
              <div className="text-xl font-bold">로그인</div>
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
    </div>,
    document.body,
  );
}
