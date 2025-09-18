import { Navigate, Outlet } from "react-router-dom";
import { useContextAuth } from "@/context/authContext";

export const PrivateRoutes = () => {
  const { isAuthenticated } = useContextAuth();
  if (isAuthenticated === null) return null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
