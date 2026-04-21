import { create } from 'zustand';

interface AuthStore {
  token: string | null;
  userName: string | null;
  login: (token: string, userName: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem('token'),
  userName: localStorage.getItem('userName'),

  login: (token, userName) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    set({ token, userName });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    set({ token: null, userName: null });
  },
}));
