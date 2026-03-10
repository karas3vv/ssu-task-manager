import { useAppSelector } from '../../app/hooks';

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <section>
      <h1>Профиль</h1>
      <div className="panel profile-card">
        <p><strong>Имя:</strong> {user?.name ?? 'Вадим Студент'}</p>
        <p><strong>Почта:</strong> {user?.email ?? 'student@example.com'}</p>
        <p><strong>Роль:</strong> Разработчик интерфейсов</p>
      </div>
    </section>
  );
}
