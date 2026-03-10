import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loginUser } from '../../store/user/userSlice';
import AppButton from '../../ui/AppButton/AppButton';
import AppInput from '../../ui/AppInput/AppInput';
import './LoginPage.css';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('student@example.com');
  const [password, setPassword] = useState('123456');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h1 className="auth-title">Вход</h1>

          <AppInput
            label="Электронная почта"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <AppInput
            label="Пароль"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

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
