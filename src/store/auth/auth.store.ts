'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthUser } from '@/types/common';
import usersData from '@/data/users.json';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        const user = usersData.find(
          (u) => u.email === email && u.password === password
        );
        if (!user) {
          return { success: false, error: 'Invalid email or password' };
        }
        set({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as 'admin',
          },
          isAuthenticated: true,
        });
        return { success: true };
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
