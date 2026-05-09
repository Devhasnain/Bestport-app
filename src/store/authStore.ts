import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User } from '@/types/index';
import { create } from 'zustand';


export interface AuthState {
  email?: string | null;
  maskedEmail?: string | null;
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  passwordResetToken?: string | null;
  lastAuthenticated: number | null;
  isLoading: boolean;

  setLastAuthenticated: (date: number | null) => void;
  setLoading: (loading: boolean) => void;
  setUser: (user: User) => void;
  updateUser:(user:User)=>void;
  setAccessToken: (token: string) => void;
  setMaskedEmail: (email: string) => void;
  setEmail: (email: string) => void;
  setPasswordResetToken: (token: string) => void;
  setAuth: (user: User, token: string) => void;
  logout: () =>void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      maskedEmail: null,
      email: null,
      user: null,
      accessToken: null,
      isAuthenticated: false,
      lastAuthenticated: null,
      isLoading: false,

      setLoading: (loading) => set({ isLoading: loading }),
      setLastAuthenticated: (date) => set({ lastAuthenticated: date }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      updateUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token, isAuthenticated: !!token }),
      setMaskedEmail: (email) => set({ maskedEmail: email }),
      setEmail: (email) => set({ email }),
      setPasswordResetToken: (token) => set({ passwordResetToken: token }),

      setAuth: (user, token) => {
        set({
          user,
          accessToken: token,
          isAuthenticated: true,
          lastAuthenticated: Date.now(),
        });
      },

      logout: async () => {
        await AsyncStorage.removeItem('auth-storage')
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          email: null,
          maskedEmail: null,
          passwordResetToken: null,
          lastAuthenticated: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        lastAuthenticated: state.lastAuthenticated,
      }),
    }
  )
);