import * as React from 'react';

import {
  Button as SharedButton,
  type ButtonProps as SharedButtonProps,
} from '@/app/components/shared/button';
import { cn } from '@/lib/utils';

type LegacyVariant = 'base' | 'hover' | 'contained';
type LegacySize = 'small' | 'medium' | 'large';

export type TailwindButtonProps = Omit<SharedButtonProps, 'variant' | 'size'> & {
  variant?: LegacyVariant;
  size?: LegacySize;
};

function mapVariant(variant: LegacyVariant): NonNullable<SharedButtonProps['variant']> {
  switch (variant) {
    case 'contained':
      return 'default';
    case 'hover':
      return 'outline';
    case 'base':
    default:
      return 'ghost';
  }
}

function mapSize(size: LegacySize): NonNullable<SharedButtonProps['size']> {
  switch (size) {
    case 'small':
      return 'sm';
    case 'large':
      return 'lg';
    case 'medium':
    default:
      return 'default';
  }
}

function legacyVariantOverrides(variant: LegacyVariant) {
  switch (variant) {
    case 'contained':
      return ['border-2 border-primary', 'hover:brightness-95'].join(' ');
    case 'hover':
      return [
        'border-2 bg-transparent',
        'border-primary text-primary',
        'hover:bg-primary hover:text-primary-foreground hover:brightness-95',
        'disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:brightness-100',
      ].join(' ');
    case 'base':
    default:
      return ['bg-transparent text-inherit', 'hover:bg-transparent hover:text-inherit'].join(' ');
  }
}

export const BaseButton = React.forwardRef<HTMLButtonElement, TailwindButtonProps>(
  function BaseButton(
    { className, size = 'medium', variant = 'base', type = 'button', style, ...props },
    ref,
  ) {
    return (
      <SharedButton
        ref={ref}
        type={type}
        size={mapSize(size)}
        variant={mapVariant(variant)}
        className={cn('rounded-sm', legacyVariantOverrides(variant), className)}
        style={{ fontFamily: 'var(--font-pretendard)', ...style }}
        {...props}
      />
    );
  },
);

BaseButton.displayName = 'BaseButton';

export const HoverButton = React.forwardRef<HTMLButtonElement, TailwindButtonProps>(
  function HoverButton({ className, ...props }, ref) {
    return <BaseButton ref={ref} variant="hover" className={className} {...props} />;
  },
);

HoverButton.displayName = 'HoverButton';

export const ContainedButton = React.forwardRef<HTMLButtonElement, TailwindButtonProps>(
  function ContainedButton({ className, ...props }, ref) {
    return <BaseButton ref={ref} variant="contained" className={className} {...props} />;
  },
);

ContainedButton.displayName = 'ContainedButton';
