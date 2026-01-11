import Link from 'next/link';

import PostCardLoading from './PostCardLoading';

function dateFormat(date: Date) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  const dateString = year + '-' + month + '-' + day;
  return dateString;
}

export default function PostCard({
  id,
  user,
  caption,
  date,
  title,
  image,
  avatar,
  isLoading = false,
}: {
  id: string;
  user: string;
  caption: string;
  date: Date;
  title: string;
  image: string;
  avatar: string;
  isLoading?: boolean;
}) {
  return (
    <div className="flex w-full flex-col rounded-sm bg-card text-card-foreground shadow-none transition-transform duration-300 hover:scale-[1.05] hover:shadow-md">
      {isLoading ? (
        <PostCardLoading />
      ) : (
        <Link href={`/${encodeURIComponent(user)}/${id}`} prefetch={false} className="no-underline">
          <div className="w-full">
            <img
              className="h-[12rem] w-full object-cover object-center rounded-t-sm"
              src={image ? image : '/Default_Image.jpeg'}
              alt={title}
            />
          </div>
          <div className="w-full p-4">
            <div>
              <div className="truncate text-base font-bold">{title}</div>
              <div>
                <p
                  className="mt-2 h-16 overflow-hidden text-sm text-muted-foreground"
                  style={
                    {
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      wordWrap: 'break-word',
                      wordBreak: 'break-word',
                    } as React.CSSProperties
                  }
                >
                  {caption}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">{dateFormat(new Date(date))}</div>
            </div>
            <div className="flex items-center pt-2">
              <img
                src={avatar ? avatar : ''}
                alt={user}
                className="h-6 w-6 rounded-full bg-gray-200 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="ml-1.5 truncate text-xs text-muted-foreground">{user}</div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
