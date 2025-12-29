import Link from 'next/link';

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
      <div className="w-48 overflow-hidden rounded-md border border-gray-100 bg-white shadow-lg">
        {MenuOption.filter((item) => item.isVisible === true).map((item, index) => {
          const baseItemClass =
            'block w-full px-4 py-3 text-left text-sm font-medium text-black hover:bg-[#f9f9f9] hover:border-l-4 hover:border-[#96C2F7]';

          if (item.handleClick) {
            return (
              <button
                key={index}
                type="button"
                onClick={() => {
                  item.handleClick?.();
                  onClose?.();
                }}
                className={[baseItemClass, item.className].filter(Boolean).join(' ')}
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
              className={[baseItemClass, item.className].filter(Boolean).join(' ')}
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
