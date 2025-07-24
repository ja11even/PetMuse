import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPets,
  deletePets,
  fetchPets,
  updatePets,
} from "../Services/apiPets";
import { useUser } from "./useUser";
import toast from "react-hot-toast";
import { useSelectedPet } from "../Components/useSelectedPet";
import { useEffect } from "react";

export function useFetchPets() {
  const { user, isLoadingUser } = useUser();
  const userId = user?.id;
  const { selectedPet, setSelectedPet } = useSelectedPet();
  const { data: pets, isLoading: isLoadingPets } = useQuery({
    queryKey: ["Pets", userId],
    queryFn: () => fetchPets(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (!selectedPet && pets?.length > 0) {
      setSelectedPet(pets[0]);
    }
  }, [selectedPet, setSelectedPet, pets]);

  return { pets, isLoadingPets, isLoadingUser };
}

export function useAddPets() {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPets,
    onSuccess: () => {
      toast.success("Pet added");
      queryClient.invalidateQueries(["Pets", userId]);
    },
    onError: () => {
      toast.error("Failed to add pet");
    },
  });
}

export function useUpdatePets() {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }) => updatePets(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(["Pets", userId]);
    },
  });
}

export function useDeletePets() {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePets,
    onSuccess: () => {
      queryClient.invalidateQueries(["Pets", userId]);
    },
  });
}
