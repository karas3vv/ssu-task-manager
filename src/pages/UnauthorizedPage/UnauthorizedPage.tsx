import { Link, useLocation } from 'react-router-dom';

export default function UnauthorizedPage() {
  const location = useLocation();
  const fromState = (location.state as { from?: { pathname?: string; search?: string; hash?: string } } | null)?.from;

  return (
    <section className="centered-page">
      <div className="panel auth-form">
        <h1>Доступ ограничен</h1>
        <p>
          Для перехода на эту страницу нужно выполнить авторизацию.
        </p>
        <div className="hero-actions">
          <Link to="/login" state={{ from: fromState }} className="link-button">
            Войти
          </Link>
          <Link to="/register" state={{ from: fromState }} className="link-button secondary">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </section>
  );
}
