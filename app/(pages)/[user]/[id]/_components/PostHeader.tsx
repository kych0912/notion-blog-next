import PostTitle from './PostTitle';
import PostProperty from './PostProperty';

export default function PostHeader({}) {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center justify-center px-[calc(min(16px,8vw))] py-2">
      <div className="w-full">
        <PostTitle />

        <PostProperty />
      </div>
    </div>
  );
}
