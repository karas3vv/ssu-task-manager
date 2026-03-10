import { useAppSelector } from '../../app/hooks';

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <section>
      <h1>Profile</h1>
      <div className="panel profile-card">
        <p><strong>Name:</strong> {user?.name ?? 'Vadim Student'}</p>
        <p><strong>Email:</strong> {user?.email ?? 'student@example.com'}</p>
        <p><strong>Role:</strong> Frontend developer</p>
      </div>
    </section>
  );
}
