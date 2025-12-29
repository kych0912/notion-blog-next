interface RefetchPageProps {
  message: string;
  refetch: () => void;
}

export default function RefetchPage({ message, refetch }: RefetchPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="text-lg font-bold">{message}</div>
      <div className="text-sm text-muted-foreground">문제가 지속될 경우 문의해 주세요.</div>
      <button
        type="button"
        onClick={refetch}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-95"
      >
        다시 시도
      </button>
    </div>
  );
}
