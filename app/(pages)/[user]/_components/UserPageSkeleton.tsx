import PostCard from '@/app/components/PostCard/PostCard';

export default function UserPageSkeleton() {
  return (
    <div
      role="status"
      aria-label="마이페이지를 불러오는 중"
      aria-busy="true"
      className="profile-page site-container profile-loading"
    >
      <div className="profile-header" aria-hidden="true">
        <div className="profile-identity">
          <div className="profile-avatar skeleton" />
          <div className="profile-name-skeleton skeleton" />
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-categories" aria-hidden="true">
          <div className="profile-section-heading">
            <div className="profile-heading-skeleton skeleton" />
          </div>
          <div className="profile-category-loading">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="category-skeleton skeleton" />
            ))}
          </div>
        </div>
        <div className="profile-feed" aria-hidden="true">
          <div className="profile-section-heading">
            <div className="profile-heading-skeleton skeleton" />
          </div>
          <div className="profile-posts">
            {Array.from({ length: 4 }, (_, index) => (
              <PostCard
                key={index}
                id=""
                user=""
                caption=""
                date={new Date(0)}
                title=""
                image=""
                avatar=""
                variant="row"
                isLoading
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
