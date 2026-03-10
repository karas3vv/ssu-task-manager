import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <section className="landing">
      <div className="container">
        <div className="landing__grid">
          <div className="landing__content">
            <h1 className="landing__title">Менеджер задач</h1>

            <p className="landing__text">
              Одностраничное приложение для управления задачами с авторизацией,
              Redux Toolkit, CRUD-операциями и русскоязычным интерфейсом.
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
