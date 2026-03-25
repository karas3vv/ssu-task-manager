import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../store/user/userSlice';
import AppButton from '../../ui/AppButton/AppButton';
import { routeStorage } from '../../utils/localStorage';

export default function Header() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth, user } = useAppSelector((state) => state.user);
  const dashboardLink = routeStorage.getLastRoute() ?? '/dashboard';
  const hideGuestActions = location.pathname === '/auth-required';

  const handleLogout = () => {
    dispatch(logout());
    routeStorage.clearLastRoute();
    navigate('/');
  };

  return (
    <header className="header">
      <Link to={isAuth ? dashboardLink : '/'} className="brand">Менеджер задач</Link>
      <nav className="header-nav">
        {isAuth ? (
          <>
            <span className="user-pill">{user?.name ?? 'Пользователь'}</span>
            <AppButton type="button" onClick={handleLogout}>Выйти</AppButton>
          </>
        ) : !hideGuestActions ? (
          <>
            <Link to="/login">Вход</Link>
            <Link to="/register">Регистрация</Link>
          </>
        ) : null}
      </nav>
    </header>
  );
}
