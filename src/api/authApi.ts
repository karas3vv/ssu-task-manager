import type { LoginPayload, RegisterPayload, User } from '../types';
import { mockUser } from './mockDb';

interface AuthResponse {
  token: string;
  user: User;
}

const delay = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 350));
};

export const authApi = {
  login: async (_payload: LoginPayload): Promise<AuthResponse> => {
    await delay();
    return {
      token: 'fake-jwt-token',
      user: mockUser,
    };
  },
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    await delay();
    return {
      token: 'fake-jwt-token',
      user: {
        ...mockUser,
        name: payload.name,
        email: payload.email,
      },
    };
  },
  getProfile: async (): Promise<User> => {
    await delay();
    return mockUser;
  },
};
