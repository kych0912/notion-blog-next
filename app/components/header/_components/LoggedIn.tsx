'use client';
import Link from 'next/link';
import React from 'react';
import { DefaultSession } from 'next-auth';
import { signOut } from 'next-auth/react';

import { HoverButton } from '../../Button/button.styles';

import UserMenu from './UserMenu';

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LoggedIn({ user }: { user: DefaultSession }) {
  const [open, setOpen] = React.useState(false);
  const [ishover, setIshover] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    signOut();
  };

  const MenuOption = [
    {
      title: '내 정보',
      link: `/${user.user?.name}`,
      isVisible: true,
    },
    {
      title: '새 글 쓰기',
      link: '/write',
      isVisible: true,
      className: 'sm:hidden',
    },
    {
      title: '로그아웃',
      link: '/logout',
      handleClick: handleLogout,
      isVisible: true,
    },
  ];

  const handleMenu = () => {
    setOpen(!open);
  };

  const handleHover = (bool: boolean) => {
    setIshover(bool);
  };

  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const targetNode = event.target as Node | null;
      if (!targetNode) return;
      if (!containerRef.current?.contains(targetNode)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [open]);

  return (
    <>
      <div ref={containerRef} className="relative flex items-center">
        <div className="hidden pr-3 sm:flex">
          <Link href="/write" prefetch={false} passHref>
            <HoverButton>새 글 쓰기</HoverButton>
          </Link>
        </div>

        <button
          type="button"
          className="relative flex cursor-pointer items-center"
          onMouseEnter={() => {
            handleHover(true);
          }}
          onMouseLeave={() => {
            handleHover(false);
          }}
          onClick={() => {
            handleMenu();
          }}
        >
          <img
            src={user.user?.image ?? ''}
            alt="user avatar"
            className="h-10 w-10 rounded-full bg-gray-200 object-cover"
            referrerPolicy="no-referrer"
          />
          <ChevronDownIcon
            className={[
              'ml-1 transition-colors duration-200',
              ishover ? 'text-primary' : 'text-muted-foreground',
            ].join(' ')}
          />
        </button>
        {open && (
          <UserMenu
            MenuOption={MenuOption}
            onClose={() => {
              setOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
}
