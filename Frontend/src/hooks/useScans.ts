import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/client";


export const useCreateScan = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) =>
      api.post("/scans", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["scans"] });
      navigate(`/processing/${res.data.scan.id}`);
    },
  });
};

export const useScan = (scanId: string) =>
  useQuery({
    queryKey: ["scans", scanId],
    queryFn: () => api.get(`/scans/${scanId}`),
    refetchInterval: (query) => {
      const status = query.state.data?.data?.scan?.status;
      if (status === "COMPLETED" || status === "FAILED") return false;
      return 2000;
    },
    enabled: !!scanId,
  });

export const useDishes = (scanId: string, filters: Record<string, any>) =>
  useQuery({
    queryKey: ["scans", scanId, "dishes", filters],
    queryFn: () => api.get(`/scans/${scanId}/dishes`, { params: filters }),
    enabled: !!scanId,
  });

export const useDishDetail = (scanId: string, dishId: string) =>
  useQuery({
    queryKey: ["scans", scanId, "dishes", dishId],
    queryFn: () => api.get(`/scans/${scanId}/dishes/${dishId}`),
    enabled: !!scanId && !!dishId,
  });

export const useRecommendations = (scanId: string) =>
  useQuery({
    queryKey: ["scans", scanId, "recommendations"],
    queryFn: () => api.get(`/scans/${scanId}/recommendations`),
    enabled: !!scanId,
  });

export const useRecentScans = () =>
  useQuery({
    queryKey: ["scans", "recent"],
    queryFn: () => api.get("/scans/recent"),
  });

export const useScanHistory = (search: string, page: number) =>
  useQuery({
    queryKey: ["scans", { search, page }],
    queryFn: () => api.get("/scans", { params: { search, page, limit: 12 } }),
  });

export const useRenameScan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      restaurantName,
    }: {
      id: string;
      restaurantName: string;
    }) => api.patch(`/scans/${id}`, { restaurantName }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["scans"] }),
  });
};

export const useDeleteScan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/scans/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["scans"] }),
  });
};
