import { Link, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import AppButton from '../../ui/AppButton/AppButton';
import AppInput from '../../ui/AppInput/AppInput';
import './LoginPage.css';
import { useLoginPage } from '../../hooks/useLoginPage';
import { routeStorage } from '../../utils/localStorage';

export default function LoginPage() {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const props = useLoginPage();

  if (isAuth) {
    return <Navigate to={routeStorage.getLastRoute() ?? '/dashboard'} replace />;
  }

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
