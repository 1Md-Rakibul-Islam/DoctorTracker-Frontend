'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import type { LoginCredentials, LoginResponse, RegisterCredentials, RegisterResponse } from './types';

export function useAuth() {
  const { data: session, status } = useSession();

  const authenticate = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const res = await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    if (res?.error) {
      return { success: false, error: res.error };
    }
    return { success: true };
  };

  const registerUser = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!data.success) {
        return { success: false, error: data.message || 'Registration failed' };
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return {
    user: session?.user || null,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    authenticate,
    registerUser,
    logout,
  };
}
