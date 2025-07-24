import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./useUser";
import {
  addAppointments,
  deleteAppointments,
  fetchAllAppointments,
  fetchAppointments,
  updateAppointments,
} from "../Services/apiAppointments";
import toast from "react-hot-toast";
import { useSelectedPet } from "../Components/useSelectedPet";

export function useAppointments() {
  const { user } = useUser();
  const userId = user?.id;
  const { selectedPet } = useSelectedPet();
  const petId = selectedPet?.id;
  return useQuery({
    queryKey: ["Appointments", userId, petId],
    queryFn: () => fetchAppointments(userId, petId),
    enabled: !!userId && !!petId,
  });
}
export function useFetchAllAppointments() {
  const { user } = useUser();
  const userId = user?.id;
  return useQuery({
    queryKey: ["Appointments", userId],
    queryFn: () => fetchAllAppointments(userId),
    enabled: !!userId,
  });
}
export function useAddAppointments() {
  const { user } = useUser();
  const userId = user?.id;
  const { selectedPet } = useSelectedPet();
  const petId = selectedPet?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAppointments,
    onSuccess: () => {
      toast.success("Appointment added");
      queryClient.invalidateQueries(["Appointments", userId, petId]);
    },
    onError: () => {
      toast.error("Failed to add appointment");
    },
  });
}

export function useUpdateAppointments() {
  const { user } = useUser();
  const userId = user?.id;
  const { selectedPet } = useSelectedPet();
  const petId = selectedPet?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }) => updateAppointments(id, updates),
    onSuccess: () => {
      toast.success("Appointment updated");
      queryClient.invalidateQueries(["Appointments", userId, petId]);
    },
    onError: () => {
      toast.error("Failed to update appointment");
    },
  });
}

export function useDeleteAppointments() {
  const { user } = useUser();
  const userId = user?.id;
  const { selectedPet } = useSelectedPet();
  const petId = selectedPet?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAppointments,
    onSuccess: () => {
      toast.success("Appointment deleted");
      queryClient.invalidateQueries(["Appointments", userId, petId]);
    },
    onError: () => {
      toast.error("Failed to delete appointment");
    },
  });
}
