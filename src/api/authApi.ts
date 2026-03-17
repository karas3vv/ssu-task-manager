import type { LoginPayload, RegisterPayload, User } from '../types';
import { axiosInstance } from './axiosInstance';

interface AuthResponse {
  token: string;
  user: User;
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>('/auth/login', payload);
    return data;
  },
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>('/auth/register', payload);
    return data;
  },
  getProfile: async (): Promise<User> => {
    const { data } = await axiosInstance.get<User>('/auth/me');
    return data;
  },
};
