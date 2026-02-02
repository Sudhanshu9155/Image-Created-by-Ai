import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import Loader from "@/components/Loader";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <Loader />;
  }

  if (!isSignedIn) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default ProtectedRoute;