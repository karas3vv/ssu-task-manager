import { Link } from 'react-router-dom';
import AppButton from '../../ui/AppButton/AppButton';
import AppInput from '../../ui/AppInput/AppInput';
import './LoginPage.css';
import { useLoginPage } from '../../hooks/useLoginPage';

export default function LoginPage() {
  const props = useLoginPage();

  return (
    <div className="auth-page">
      <div className="auth-container">
        <form className="auth-card" onSubmit={props.handleSubmit}>
          <h1 className="auth-title">Вход</h1>
          {
            props.TEXT_FILEDS && props.TEXT_FILEDS.map((field) => (
              <AppInput
                key={field.id}
                {...field }
              />
            ))
          }
          <AppButton type="submit" fullWidth>
            Войти
          </AppButton>

          <p className="auth-footer">
            Еще нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </p>
        </form>
      </div>
    </div>
  );
}