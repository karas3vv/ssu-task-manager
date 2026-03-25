import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { registerUser } from '../../store/user/userSlice';
import { routeStorage } from '../../utils/localStorage';

export function useRegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromState = (location.state as { from?: { pathname?: string; search?: string; hash?: string } } | null)?.from;
  const from = fromState ? `${fromState.pathname ?? ''}${fromState.search ?? ''}${fromState.hash ?? ''}` : null;

  const [name, setName] = useState('Вадим');
  const [email, setEmail] = useState('student@example.com');
  const [password, setPassword] = useState('123456');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resultAction = await dispatch(
      registerUser({ name, email, password })
    );

    if (registerUser.fulfilled.match(resultAction)) {
      navigate(from ?? routeStorage.getLastRoute() ?? '/dashboard', { replace: true });
    }
  };

  const TEXT_FILEDS = [
    {
      id: 0,
      type: 'text',
      name: 'name',
      label: 'Имя',
      value: name,
      onChange: handleNameChange,
      required: true,
    },
    {
      id: 1,
      type: 'email',
      name: 'email',
      label: 'Электронная почта',
      value: email,
      onChange: handleEmailChange,
      required: true,
    },
    {
      id: 2,
      type: 'password',
      name: 'password',
      label: 'Пароль',
      value: password,
      onChange: handlePasswordChange,
      required: true,
    },
  ];

  return {
    TEXT_FILEDS,
    handleSubmit,
  };
}
