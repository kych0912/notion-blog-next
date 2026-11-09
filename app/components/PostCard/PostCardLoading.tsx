export default function PostCardLoading() {
  return (
    <div className="post-card__link post-card__loading" aria-hidden="true">
      <div className="post-card__media skeleton" />
      <div className="post-card__content">
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--summary" />
        <div className="skeleton skeleton--meta" />
      </div>
    </div>
  );
}
