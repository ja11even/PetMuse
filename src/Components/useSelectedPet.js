import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useSelectedPet = create(
  persist(
    (set) => ({
      selectedPet: null,
      setSelectedPet: (pet) => set({ selectedPet: pet }),
      reset: () => set({ selectedPet: null }),
    }),
    {
      name: "selected-pet",
      partialize: (state) => ({ selectedPet: state.selectedPet }),
    }
  )
);
