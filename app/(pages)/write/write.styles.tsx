'use client';

import * as React from 'react';

import { cn } from '@/app/utils/utils';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function WriteFunnelContainer({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn('write-preview-container', className)} {...props}>
      {children}
    </div>
  );
}

export function FunnelContainer({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn('write-source', className)} {...props}>
      {children}
    </div>
  );
}

export function ContentContainer({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn('write-source-inner', className)} {...props}>
      {children}
    </div>
  );
}

export function InputContainer({ children, className }: ContainerProps) {
  return <div className={cn('write-input-container', className)}>{children}</div>;
}

export function PostActionBarContainer({ children, className }: ContainerProps) {
  return (
    <nav className={cn('write-actions', className)} aria-label="글 발행">
      {children}
    </nav>
  );
}

export function PostActionBarWrapper({ children, className }: ContainerProps) {
  return <div className={cn('write-actions-inner', className)}>{children}</div>;
}

export function PostActionBarButtonContainer({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn('write-back', className)} {...props}>
      {children}
    </div>
  );
}
