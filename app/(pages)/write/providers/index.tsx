'use client';
import { PageIdProvider } from './PageIdProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <PageIdProvider>{children}</PageIdProvider>;
}
