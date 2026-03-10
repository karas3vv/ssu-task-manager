import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <section className="landing">
      <div className="container">
        <div className="landing__grid">
          <div className="landing__content">
            
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
        </div>
      </div>
    </section>
  );
}