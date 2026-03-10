import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <section className="landing">
      <div className="container">
        <div className="landing__grid">
          <div className="landing__content">
            <span className="landing__label">REACT + TYPESCRIPT COURSE PROJECT</span>

            <h1 className="landing__title">Task Manager</h1>

            <p className="landing__text">
              Multi-page task manager with protected routes, Redux Toolkit store,
              axios layer and CRUD operations.
            </p>

            <div className="landing__actions">
              <Link to="/login" className="landing__button landing__button--primary">
                Sign in
              </Link>

              <Link to="/register" className="landing__button landing__button--secondary">
                Create account
              </Link>
            </div>
          </div>

          <div className="landing__card">
            <h2 className="landing__card-title">Included in the project</h2>

            <ul className="landing__list">
              <li>Landing, login, register, profile and dashboard pages</li>
              <li>Three extra pages: tasks, analytics and categories</li>
              <li>AuthWrapper and CommonWrapper</li>
              <li>RTK slices for user, settings, tasks and categories</li>
              <li>GET, POST, PUT, PATCH, DELETE examples</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}