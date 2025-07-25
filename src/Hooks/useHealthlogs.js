import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addHealthlogs,
  deleteHealthlogs,
  fetchAllHealthlogs,
  fetchHealthlogs,
  updateHealthLogs,
} from "../Services/apiHealthlogs";
import { useUser } from "./useUser";
import toast from "react-hot-toast";
import { useSelectedPet } from "../Components/useSelectedPet";

export function useFetchHealthlogs() {
  const { user } = useUser();
  const userId = user?.id;
  const { selectedPet } = useSelectedPet();
  const petId = selectedPet?.id;
  return useQuery({
    queryKey: ["Healthlogs", userId, petId],
    queryFn: () => fetchHealthlogs(userId, petId),
    enabled: !!userId && !!petId,
  });
}

export function useFetchAllHealthlogs() {
  const { user } = useUser();
  const userId = user?.id;
  return useQuery({
    queryKey: ["Healthlogs", userId],
    queryFn: () => fetchAllHealthlogs(userId),
    enabled: !!userId,
  });
}
export function useAddHealthlogs() {
  const { user } = useUser();
  const userId = user?.id;
  const { selectedPet } = useSelectedPet();
  const petId = selectedPet?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addHealthlogs,
    onSuccess: () => {
      toast.success("Health log added");
      queryClient.invalidateQueries(["Healthlogs", userId, petId]);
    },
    onError: () => {
      toast.error("Failed to add log");
    },
  });
}

export function useUpdateHealthlogs() {
  const { user } = useUser();
  const userId = user?.id;
  const { selectedPet } = useSelectedPet();
  const petId = selectedPet?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }) => updateHealthLogs(id, updates),
    onSuccess: () => {
      toast.success("Health log updated");
      queryClient.invalidateQueries(["Healthlogs", userId, petId]);
    },
    onError: () => {
      toast.error("Failed to update log");
    },
  });
}

export function useDeleteHealthlogs() {
  const { user } = useUser();
  const userId = user?.id;
  const { selectedPet } = useSelectedPet();
  const petId = selectedPet?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHealthlogs,
    onSuccess: () => {
      toast.success("Health log deleted");
      queryClient.invalidateQueries(["Healthlogs", userId, petId]);
    },
    onError: () => {
      toast.error("Failed to delete log");
    },
  });
}
