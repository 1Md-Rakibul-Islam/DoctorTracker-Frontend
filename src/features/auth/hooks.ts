'use client';

import { useAuthStore } from '@/store/auth/auth.store';
import type { LoginCredentials, LoginResponse } from './types';

export function useAuth() {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  const authenticate = (credentials: LoginCredentials): LoginResponse => {
    return login(credentials.email, credentials.password);
  };

  return {
    user,
    isAuthenticated,
    authenticate,
    logout,
  };
}
