import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../Hooks/useUser";
import FullPageLoader from "./FullPageLoader";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoadingUser, isAuthenticated } = useUser();
  const { user } = useUser();
  useEffect(() => {
    if (isLoadingUser) return;

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (
      user &&
      !user?.user_metadata?.firstName &&
      !user?.user_metadata?.lastName
    )
      navigate("/welcome");
  }, [
    user,
    isAuthenticated,
    isLoadingUser,
    user?.user_metadata?.firstName,
    user?.user_metadata?.lastName,
    navigate,
  ]);
  console.log(user);
  if (isLoadingUser) return <FullPageLoader />;

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
