import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/api/client";

export const useSubscription = () =>
  useQuery({
    queryKey: ["subscription"],
    queryFn: () => api.get("/subscription"),
  });

export const useUsage = () =>
  useQuery({
    queryKey: ["subscription", "usage"],
    queryFn: () => api.get("/subscription/usage"),
  });

export const useCreateCheckout = () =>
  useMutation({
    mutationFn: () => api.post("/subscription/checkout"),
    onSuccess: (res) => {
      window.location.href = res.data.url;
    },
  });

export const useCreatePortal = () =>
  useMutation({
    mutationFn: () => api.post("/subscription/portal"),
    onSuccess: (res) => {
      window.location.href = res.data.url;
    },
  });