import { Link } from 'react-router-dom';
import AppButton from '../../ui/AppButton/AppButton';
import AppInput from '../../ui/AppInput/AppInput';
import { useRegisterPage } from '../../hooks/useRegisterPage/useRegisterPage';

export default function RegisterPage() {
  const props = useRegisterPage();

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