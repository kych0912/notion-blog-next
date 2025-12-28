import * as React from 'react';

type ButtonSize = 'small' | 'medium' | 'large';

type TailwindButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
};

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(' ');
}

const sizeClass: Record<ButtonSize, string> = {
  small: 'px-3 py-1.5 text-sm rounded-xl',
  medium: 'px-4 py-2 text-base rounded-2xl',
  large: 'px-6 py-3 text-lg rounded-[1.25rem]',
};

export const BaseButton = React.forwardRef<HTMLButtonElement, TailwindButtonProps>(
  function BaseButton({ className, disabled, size = 'medium', type = 'button', ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          sizeClass[size],
          className,
        )}
        style={{ fontFamily: 'var(--font-pretendard)' }}
        {...props}
      />
    );
  },
);

export const HoverButton = React.forwardRef<HTMLButtonElement, TailwindButtonProps>(
  function HoverButton({ className, ...props }, ref) {
    return (
      <BaseButton
        ref={ref}
        className={cn(
          'border-2 bg-transparent',
          'border-[#96C2F7] text-[#96C2F7]',
          'hover:bg-[#96C2F7] hover:text-white',
          'focus-visible:ring-[#96C2F7]',
          'disabled:hover:bg-transparent disabled:hover:text-inherit',
          className,
        )}
        {...props}
      />
    );
  },
);

export const ContainedButton = React.forwardRef<HTMLButtonElement, TailwindButtonProps>(
  function ContainedButton({ className, ...props }, ref) {
    return (
      <BaseButton
        ref={ref}
        className={cn(
          'border-2 text-white',
          'border-[#96C2F7] bg-[#96C2F7]',
          'hover:border-[#6FAAF1] hover:bg-[#6FAAF1]',
          'focus-visible:ring-[#96C2F7]',
          className,
        )}
        {...props}
      />
    );
  },
);
