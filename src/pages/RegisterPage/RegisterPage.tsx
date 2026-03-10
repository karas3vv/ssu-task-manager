import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { registerUser } from '../../store/user/userSlice';
import AppButton from '../../ui/AppButton/AppButton';
import AppInput from '../../ui/AppInput/AppInput';

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('Вадим');
  const [email, setEmail] = useState('student@example.com');
  const [password, setPassword] = useState('123456');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultAction = await dispatch(registerUser({ name, email, password }));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };

  return (
    <section className="centered-page">
      <form className="panel auth-form" onSubmit={handleSubmit}>
        <h1>Регистрация</h1>
        <AppInput label="Имя" value={name} onChange={(event) => setName(event.target.value)} required />
        <AppInput label="Электронная почта" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <AppInput label="Пароль" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        <AppButton type="submit" fullWidth>Создать аккаунт</AppButton>
        <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
      </form>
    </section>
  );
}
