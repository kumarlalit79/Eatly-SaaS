import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Subscription } from "../types";
import { api } from "../api/client";

interface AuthState {
  token: string | null;
  user: User | null;
  subscription: Subscription | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setAuth: (token: string, user: User, subscription: Subscription) => void;
  setUser: (user: User) => void;
  setSubscription: (subscription: Subscription) => void;
  logout: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      subscription: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: (token, user, subscription) => {
        set({
          token,
          user,
          subscription,
          isAuthenticated: true,
        });
      },

      setUser: (user) => set({ user }),

      setSubscription: (subscription) => set({ subscription }),

      logout: () => {
        set({
          token: null,
          user: null,
          subscription: null,
          isAuthenticated: false,
        });

        localStorage.removeItem("auth-storage");
      },

      initialize: async () => {
        const token = get().token;

        if (!token) {
          set({ isLoading: false });
          return;
        }

        try {
          const res = await api.get("/auth/me");

          const { user, subscription } = res.data;

          set({
            user,
            subscription,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            token: null,
            user: null,
            subscription: null,
            isAuthenticated: false,
            isLoading: false,
          });

          localStorage.removeItem("auth-storage");
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
      }),
    },
  ),
);
