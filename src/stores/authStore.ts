import { create } from "zustand";

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoggedIn: false,
  setUser: (user, token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token);
    }
    set({
      user,
      accessToken: token,
      isLoggedIn: true,
    });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
    set({
      user: null,
      accessToken: null,
      isLoggedIn: false,
    });
  },
}));

export default useAuthStore;
