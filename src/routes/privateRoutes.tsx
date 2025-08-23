import { Navigate, Outlet } from "react-router-dom";
import { useContextAuth } from "@/context/authContext";

export const PrivateRoutes = () => {
  const { isAuthenticated } = useContextAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="sign-in" />;
};
