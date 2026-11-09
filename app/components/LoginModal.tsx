'use client';
import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

import GithubIcon from '../assets/github_logo_icon_147285.svg';

import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from './shared/dialog';

export default function LoginModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const fetchAuthCode = () => {
    signIn('github');
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!open) return null;

  return (
    <DialogContent className="login-dialog" onEscapeKeyDown={handleClose}>
      <DialogHeader>
        <DialogTitle>로그인</DialogTitle>
        <DialogDescription>노션 페이지로 블로그 포스트를 작성해보세요.</DialogDescription>
      </DialogHeader>
      <button type="button" onClick={fetchAuthCode} className="login-provider">
        <Image
          src={GithubIcon as unknown as string}
          alt=""
          width={20}
          height={20}
          className="login-provider__icon"
        />
        깃허브로 로그인
      </button>
    </DialogContent>
  );
}
