import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  expiresIn: number | null;
  setAuth: (token: string, expiresIn: number) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      expiresIn: null,
      setAuth: (token, expiresIn) => set({ accessToken: token, expiresIn }),
      logout: () => set({ accessToken: null, expiresIn: null }),
    }),
    { name: 'auth-storage' }
  )
);

export default useAuthStore;
