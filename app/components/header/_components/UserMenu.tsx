import Link from 'next/link';

import { cn } from '@/app/utils/utils';

const UserMenu = ({
  MenuOption,
  onClose,
}: {
  MenuOption: {
    title: string;
    link: string;
    handleClick?: () => void;
    isVisible?: boolean;
    className?: string;
  }[];
  onClose?: () => void;
}) => {
  return (
    <div className="absolute top-full right-0 mt-1 flex flex-col">
      <div className="w-48 overflow-hidden rounded-md border border-border bg-card shadow-lg">
        {MenuOption.filter((item) => item.isVisible === true).map((item, index) => {
          const baseItemClass =
            'block w-full px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted hover:border-l-4 hover:border-primary';

          if (item.handleClick) {
            return (
              <button
                key={index}
                type="button"
                onClick={() => {
                  item.handleClick?.();
                  onClose?.();
                }}
                className={cn(baseItemClass, item.className)}
              >
                {item.title}
              </button>
            );
          }

          return (
            <Link
              key={index}
              href={item.link}
              onClick={() => {
                onClose?.();
              }}
              className={cn(baseItemClass, item.className)}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default UserMenu;
