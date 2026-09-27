'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { IAuthUser as AuthUser } from '@/types/common.interface';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

import Constants from '@/constants/API_CONSTANT';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const res = await fetch(Constants.LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (!data.success) {
            return { success: false, error: data.message || 'Login failed' };
          }
          set({
            user: {
              id: data.data.user._id,
              name: data.data.user.name,
              email: data.data.user.email,
              role: data.data.user.role,
            },
            token: data.data.accessToken,
            isAuthenticated: true,
          });
          return { success: true };
        } catch (err) {
          return { success: false, error: 'Network error' };
        }
      },
      register: async (name: string, email: string, password: string, role: string) => {
        try {
          const res = await fetch(Constants.REGISTER, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role }),
          });
          const data = await res.json();
          if (!data.success) {
            return { success: false, error: data.message || 'Registration failed' };
          }
          return { success: true };
        } catch (err) {
          return { success: false, error: 'Network error' };
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
