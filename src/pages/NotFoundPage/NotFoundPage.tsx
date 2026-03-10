import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="centered-page">
      <div className="panel auth-form">
        <h1>404</h1>
        <p>Page not found.</p>
        <Link to="/" className="link-button">Back to home</Link>
      </div>
    </section>
  );
}
