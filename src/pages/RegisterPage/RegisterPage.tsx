import { Link, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import AppButton from '../../ui/AppButton/AppButton';
import AppInput from '../../ui/AppInput/AppInput';
import { useRegisterPage } from '../../hooks/useRegisterPage/useRegisterPage';
import { routeStorage } from '../../utils/localStorage';

export default function RegisterPage() {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const props = useRegisterPage();

  if (isAuth) {
    return <Navigate to={routeStorage.getLastRoute() ?? '/dashboard'} replace />;
  }

  return (
    <section className="centered-page">
      <form className="panel auth-form" onSubmit={props.handleSubmit}>
        <h1>Регистрация</h1>

        {props.TEXT_FILEDS &&
          props.TEXT_FILEDS.map((field) => (
            <AppInput key={field.id} {...field} />
          ))}

        <AppButton type="submit" fullWidth>
          Создать аккаунт
        </AppButton>

        <p>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </form>
    </section>
  );
}
