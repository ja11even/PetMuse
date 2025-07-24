import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut as logOutApi } from "../Services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      navigate("/", { replace: true });
      queryClient.removeQueries();
    },
  });
}
