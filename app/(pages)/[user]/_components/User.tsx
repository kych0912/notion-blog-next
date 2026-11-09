import ProfileActions from './ProfileActions';

export default function User({
  name,
  avatar,
  userId,
}: {
  name: string;
  avatar: string;
  userId?: string;
}) {
  return (
    <header className="profile-header">
      <div className="profile-identity">
        {avatar ? (
          <img
            src={avatar}
            alt=""
            width={96}
            height={96}
            className="profile-avatar"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="profile-avatar profile-avatar--fallback" aria-hidden="true">
            {name.slice(0, 1)}
          </span>
        )}
        <h1>{name}</h1>
      </div>
      <ProfileActions userId={userId} />
    </header>
  );
}
