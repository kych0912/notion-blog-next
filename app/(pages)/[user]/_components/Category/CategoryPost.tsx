export function CategoryPost({ title }: { title: string }) {
  return (
    <div
      className="group rounded-md flex items-center gap-2 bg-background/40 px-3 py-2 text-sm text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      title={title}
    >
      <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </span>
    </div>
  );
}
