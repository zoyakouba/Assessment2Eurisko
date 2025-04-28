import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  expiresIn: string | null;
  setAuth: (token: string, expires: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      expiresIn: null,
      setAuth: (accessToken, expiresIn) => set({ accessToken, expiresIn }),
      logout: () => set({ accessToken: null, expiresIn: null }),
    }),
    { name: 'auth-store' }
  )
);

export default useAuthStore
