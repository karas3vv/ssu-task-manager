import { Link, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { routeStorage } from '../../utils/localStorage';
import './LandingPage.css';

export default function LandingPage() {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  if (isAuth) {
    return <Navigate to={routeStorage.getLastRoute() ?? '/dashboard'} replace />;
  }

  return (
    <section className="landing">
      <div className="container">
        <div className="landing__grid">
          <div className="landing__content">
            <h1 className="landing__title">Менеджер задач</h1>

            <p className="landing__text">
              Приложение для управления задачами
            </p>

            <div className="landing__actions">
              <Link to="/login" className="landing__button landing__button--primary">
                Войти
              </Link>

              <Link to="/register" className="landing__button landing__button--secondary">
                Создать аккаунт
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
