import { useSession } from 'next-auth/react';

import LoggedIn from './LoggedIn';
import NotLoggedIn from './NotLoggedIn';
import ThemeToggle from './ThemeToggle';

export default function HeaderRight() {
  return (
    <div className="flex items-center gap-2">
      <RightContent />
      <ThemeToggle />
    </div>
  );
}

function RightContent() {
  const { data: session, status } = useSession();
  switch (status) {
    case 'loading':
      return (
        <div className="flex gap-2">
          <div className="h-10 w-[100px] animate-pulse rounded-lg bg-gray-200" />
        </div>
      );
    case 'authenticated':
      if (session && session.user) {
        window.localStorage.setItem('currentUser', JSON.stringify(session.user));
        return <LoggedIn user={session} />;
      }
      return <NotLoggedIn />;
    case 'unauthenticated':
      return <NotLoggedIn />;
    default:
      return <NotLoggedIn />;
  }
}
