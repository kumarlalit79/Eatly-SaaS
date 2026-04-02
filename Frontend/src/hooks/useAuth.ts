import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/client";
import { useAuthStore } from "@/stores/authStore";

export const useLogin = () =>
  useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      api.post("/auth/login", data),
    onSuccess: (res) => {
      const { token, user, subscription } = res.data;
      useAuthStore.getState().setAuth(token, user, subscription);
    },
  });

export const useSignup = () =>
  useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) =>
      api.post("/auth/signup", data),
    onSuccess: (res) => {
      const { token, user, subscription } = res.data;
      useAuthStore.getState().setAuth(token, user, subscription);
    },
  });

export const useGoogleAuth = () =>
  useMutation({
    mutationFn: (data: { idToken: string }) => api.post("/auth/google", data),
    onSuccess: (res) => {
      const { token, user, subscription } = res.data;
      useAuthStore.getState().setAuth(token, user, subscription);
    },
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (data: { email: string }) =>
      api.post("/auth/forgot-password", data),
  });
