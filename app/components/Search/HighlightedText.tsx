export default function HighlightedText({ text, query = '' }: { text: string; query?: string }) {
  const term = query.trim();
  if (!term) return <>{text}</>;

  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return (
    <>
      {parts.map((part, index) =>
        index % 2 ? (
          <mark key={index} className="search-highlight">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}
