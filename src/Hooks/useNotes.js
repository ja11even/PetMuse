import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./useUser";
import {
  addNotes,
  deleteNotes,
  fetchAllNotes,
  fetchNotes,
  updateNotes,
} from "../Services/apiNotes";
import toast from "react-hot-toast";
import { useSelectedPet } from "../Components/useSelectedPet";

export function useFetchNotes() {
  const { user } = useUser();
  const userId = user?.id;
  const { selectedPet } = useSelectedPet();
  const petId = selectedPet?.id;
  return useQuery({
    queryKey: ["Notes", userId, petId],
    queryFn: () => fetchNotes(userId, petId),
    enabled: !!userId && !!petId,
  });
}
export function useFetchAllNotes() {
  const { user } = useUser();
  const userId = user?.id;
  return useQuery({
    queryKey: ["Notes", userId],
    queryFn: () => fetchAllNotes(userId),
    enabled: !!userId,
  });
}

export function useAddNotes() {
  const { user } = useUser();
  const userId = user?.id;
  const { selectedPet } = useSelectedPet();
  const petId = selectedPet?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addNotes,
    onSuccess: () => {
      toast.success("Note added");
      queryClient.invalidateQueries(["Notes", userId, petId]);
    },
    onError: () => {
      toast.error("Failed to add note");
    },
  });
}

export function useUpdateNotes() {
  const { user } = useUser();
  const userId = user?.id;
  const { selectedPet } = useSelectedPet();
  const petId = selectedPet?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }) => updateNotes(id, updates),
    onSuccess: () => {
      toast.success("Note updated");
      queryClient.invalidateQueries(["Notes", userId, petId]);
    },
    onError: () => {
      toast.error("Failed to update note");
    },
  });
}

export function useDeleteNotes() {
  const { user } = useUser();
  const userId = user?.id;
  const { selectedPet } = useSelectedPet();
  const petId = selectedPet?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNotes,
    onSuccess: () => {
      toast.success("Note deleted");
      queryClient.invalidateQueries(["Notes", userId, petId]);
    },
    onError: () => {
      toast.error("Failed to delete note");
    },
  });
}
