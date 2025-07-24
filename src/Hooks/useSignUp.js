import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../Services/apiAuth";
import toast from "react-hot-toast";

export function SignUp() {
  return useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success("You're in! Verify your email to start using PetMuse.");
    },
  });
}
