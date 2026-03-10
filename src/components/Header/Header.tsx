import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../store/user/userSlice';
import AppButton from '../../ui/AppButton/AppButton';

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, user } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/" className="brand">Task Manager</Link>
      <nav className="header-nav">
        {isAuth ? (
          <>
            <span className="user-pill">{user?.name ?? 'User'}</span>
            <AppButton type="button" onClick={handleLogout}>Выйти</AppButton>
          </>
        ) : (
          <>
            <Link to="/login">Логин</Link>
            <Link to="/register">Регистрация</Link>
          </>
        )}
      </nav>
    </header>
  );
}
