import PostTitle from '@/app/(pages)/[user]/[id]/_components/PostTitle';

export default function PreRenderHeader() {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center justify-center px-[calc(min(16px,8vw))] py-3">
      <div className="w-full">
        <PostTitle />
      </div>
    </div>
  );
}
