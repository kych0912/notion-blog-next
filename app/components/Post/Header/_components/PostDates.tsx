const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  dateStyle: 'medium',
  timeZone: 'Asia/Seoul',
});

export default function PostDates({
  publishedTime,
  modifiedTime,
}: {
  publishedTime: string;
  modifiedTime: string;
}) {
  if (!publishedTime) return null;

  return (
    <span className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
      <span>
        발행 <time dateTime={publishedTime}>{dateFormatter.format(new Date(publishedTime))}</time>
      </span>
      {modifiedTime && modifiedTime !== publishedTime ? (
        <span>
          수정 <time dateTime={modifiedTime}>{dateFormatter.format(new Date(modifiedTime))}</time>
        </span>
      ) : null}
    </span>
  );
}
