'use client';

import { useAuthStore } from '@/store/auth/auth.store';
import type { LoginCredentials, LoginResponse, RegisterCredentials, RegisterResponse } from './types';

export function useAuth() {
  const { user, isAuthenticated, login, register, logout } = useAuthStore();

  const authenticate = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return await login(credentials.email, credentials.password);
  };

  const registerUser = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
    return await register(credentials.name, credentials.email, credentials.password, credentials.role);
  };

  return {
    user,
    isAuthenticated,
    authenticate,
    registerUser,
    logout,
  };
}
