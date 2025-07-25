import { useEffect } from "react";
import { useSelectedPet } from "./useSelectedPet";
import { supabase } from "../Services/Supabase";

export const useAuthChangeHandler = () => {
  const setSelectedPet = useSelectedPet((state) => state.setSelectedPet);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          const newUserId = session?.user?.id;
          const previousUserId = localStorage.getItem("previous_user_id");

          if (newUserId !== previousUserId) {
            setSelectedPet(null);
          }
          localStorage.setItem("previous_user_id", newUserId);
        }
        if (event === "SIGNED_OUT") {
          localStorage.removeItem("previous_user_id");
          setSelectedPet(null);
        }
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setSelectedPet]);
};
