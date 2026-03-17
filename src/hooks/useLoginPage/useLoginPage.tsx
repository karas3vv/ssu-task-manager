import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loginUser } from '../../store/user/userSlice';

export function useLoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('student@example.com');
  const [password, setPassword] = useState('123456');

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };
  const TEXT_FILEDS = [
    {
      id: 0,
      type: 'email',
      name: 'email',
      label: 'Электронная почта',
      value: email,
      onChange: handleEmailChange,
      required: true
    },
    {
      id: 1,
      type: 'password',
      name: 'password',
      label: 'Пароль',
      value: password,
      onChange: handlePasswordChange,
      required: true
    }
  ]
  return {
     TEXT_FILEDS,
    handleSubmit,
  };
}