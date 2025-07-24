import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../Services/apiAuth";

export function useUser() {
  const { isLoading: isLoadingUser, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return {
    isLoadingUser,
    user,
    isAuthenticated: !!user,
  };
}
