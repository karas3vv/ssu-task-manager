import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="centered-page">
      <div className="panel auth-form">
        <h1>404</h1>
        <p>Страница не найдена.</p>
        <Link to="/" className="link-button">На главную</Link>
      </div>
    </section>
  );
}
