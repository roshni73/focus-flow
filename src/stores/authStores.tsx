// stores/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'viewer';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockUsers = [
          {
            id: '1',
            email: 'admin@example.com',
            password: 'password123',
            name: 'Admin User',
            role: 'admin' as const,
          },
          {
            id: '2',
            email: 'viewer@example.com',
            password: 'password123',
            name: 'Viewer User',
            role: 'viewer' as const,
          }
        ];

        const user = mockUsers.find(u => u.email === email && u.password === password);

        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({
            user: userWithoutPassword,
            isLoading: false,
            isAuthenticated: true,
            error: null
          });
          return true;
        } else {
          set({
            error: 'Invalid email or password. Please try again.',
            isLoading: false
          });
          return false;
        }
      },

      forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({ isLoading: false });
        return true;
      },

      resetPassword: async (token: string, newPassword: string) => {
        set({ isLoading: true, error: null });
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({ isLoading: false });
        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null
        });
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);