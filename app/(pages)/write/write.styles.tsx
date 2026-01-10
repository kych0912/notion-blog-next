'use client';

import * as React from 'react';

import { cn } from '@/app/utils/utils';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function WriteFunnelContainer({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'relative hidden h-screen w-1/2 flex-[2_1_0%] flex-col items-start overflow-y-auto lg:flex',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function FunnelContainer({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'sticky top-0 flex h-[calc(100vh-64px)] w-full flex-[1_1_0%] flex-col items-start',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ContentContainer({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col items-start justify-start p-8 box-border',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function InputContainer({ children, className }: ContainerProps) {
  return (
    <div className={cn('flex w-full flex-col items-start justify-center', className)}>
      {children}
    </div>
  );
}

export function PostActionBarContainer({ children, className }: ContainerProps) {
  return (
    <nav className={cn('fixed bottom-0 left-0 flex w-full self-center lg:absolute', className)}>
      {children}
    </nav>
  );
}

export function PostActionBarWrapper({ children, className }: ContainerProps) {
  return (
    <div className={cn('flex h-full w-full items-center justify-between p-4', className)}>
      {children}
    </div>
  );
}

export function PostActionBarButtonContainer({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn('flex cursor-pointer items-center justify-center', className)} {...props}>
      {children}
    </div>
  );
}
