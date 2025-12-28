export default function User({ name, avatar }: { name: string; avatar: string }) {
  return (
    <div className="mx-auto -mt-[60px] flex max-w-[720px] flex-col items-center justify-center px-[calc(min(16px,8vw))]">
      <div className="flex w-full flex-col items-center justify-start">
        <img
          src={avatar ? avatar : ''}
          alt={name}
          className="h-32 w-32 rounded-full bg-gray-200 object-cover z-10"
          referrerPolicy="no-referrer"
        />
        <div className="pt-2 text-2xl font-bold">{decodeURIComponent(name)}</div>
      </div>
    </div>
  );
}
