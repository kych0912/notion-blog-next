import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    // shadcn button 기반
    'inline-flex items-center justify-center whitespace-nowrap font-medium',
    'transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#96C2F7]',
    'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),
  {
    variants: {
      variant: {
        base: 'bg-transparent text-inherit',
        hover: [
          'border-2 bg-transparent',
          'border-[#96C2F7] text-[#96C2F7]',
          'hover:bg-[#96C2F7] hover:text-white',
          'disabled:hover:bg-transparent disabled:hover:text-inherit',
        ].join(' '),
        contained: [
          'border-2 text-white',
          'border-[#96C2F7] bg-[#96C2F7]',
          'hover:border-[#6FAAF1] hover:bg-[#6FAAF1]',
        ].join(' '),
      },
      size: {
        small: 'px-3 py-1.5 text-sm rounded-xl',
        medium: 'px-4 py-2 text-base rounded-2xl',
        large: 'px-6 py-3 text-lg rounded-[1.25rem]',
      },
    },
    defaultVariants: {
      variant: 'base',
      size: 'medium',
    },
  },
);

type TailwindButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const BaseButton = React.forwardRef<HTMLButtonElement, TailwindButtonProps>(
  function BaseButton(
    { className, disabled, size = 'medium', variant = 'base', type = 'button', ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(buttonVariants({ size, variant }), className)}
        style={{ fontFamily: 'var(--font-pretendard)' }}
        {...props}
      />
    );
  },
);

export const HoverButton = React.forwardRef<HTMLButtonElement, TailwindButtonProps>(
  function HoverButton({ className, ...props }, ref) {
    return <BaseButton ref={ref} variant="hover" className={className} {...props} />;
  },
);

export const ContainedButton = React.forwardRef<HTMLButtonElement, TailwindButtonProps>(
  function ContainedButton({ className, ...props }, ref) {
    return <BaseButton ref={ref} variant="contained" className={className} {...props} />;
  },
);
